import { describe, expect, it } from "vitest";
import { evaluatePolicy } from "@/lib/policy/engine";
import type { AgentPolicy } from "@/lib/policy/types";

const policy: AgentPolicy = {
  agentId: "trader-01",
  maxTradeSizeSol: 0.1,
  maxDailySpendSol: 0.3,
  maxOpenPositions: 1,
  allowedActions: ["BUY_TOKEN"],
  requireHumanApprovalAboveSol: 0.05,
  autonomousModeEnabled: false,
  dryRunOnly: true,
  allowedTokenMints: [],
  blockedTokenMints: ["blocked"],
  blockedWallets: [],
  minRiskScore: 0,
  maxRiskScore: 40,
  cooldownMinutes: 30,
  emergencyPaused: false
};

const action = { id: "a", agentId: "trader-01", type: "BUY_TOKEN" as const, chain: "solana" as const, tokenMint: "ok", amountSol: 0.05 };

describe("policy engine", () => {
  it("blocks emergency pause", () => expect(evaluatePolicy(action, { ...policy, emergencyPaused: true }).allowed).toBe(false));
  it("dry-run blocks live execution", () => expect(evaluatePolicy(action, policy, { liveExecutionRequested: true }).reason).toContain("Dry-run"));
  it("caps trade size", () => expect(evaluatePolicy({ ...action, amountSol: 0.2 }, policy, { minutesSinceLastAction: 30 }).modifiedAction?.amountSol).toBe(0.1));
  it("rejects daily spend exceeded", () => expect(evaluatePolicy(action, policy, { dailySpendSol: 0.29, minutesSinceLastAction: 30 }).allowed).toBe(false));
  it("rejects blocked token", () => expect(evaluatePolicy({ ...action, tokenMint: "blocked" }, policy).allowed).toBe(false));
  it("requires human approval", () => expect(evaluatePolicy(action, policy, { minutesSinceLastAction: 30 }).requiredApproval).toBe(true));
  it("rejects autonomous disabled through approval requirement path only after allowed checks", () => expect(evaluatePolicy(action, policy, { minutesSinceLastAction: 30 }).allowed).toBe(true));
});
