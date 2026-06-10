import { describe, expect, it } from "vitest";
import { runGovernorCheck, runHistorianPostmortem, runRiskReview, runScoutCycle, runTraderDecision } from "@/lib/agents/runtime";

describe("agent runtime", () => {
  it("scout creates thesis", async () => expect((await runScoutCycle()).createdThesisIds.length).toBeGreaterThan(0));
  it("risk creates score thesis", async () => expect((await runRiskReview("Goat111111111111111111111111111111111111111")).success).toBe(true));
  it("trader creates proposal path", async () => expect((await runTraderDecision("Goat111111111111111111111111111111111111111")).createdThesisIds.length).toBeGreaterThan(0));
  it("governor rejects unsafe action", async () => expect((await runGovernorCheck({ id: "unsafe", agentId: "trader-01", type: "BUY_TOKEN", chain: "solana", tokenMint: "Nibble2222222222222222222222222222222222222", amountSol: 1, metadata: { riskScore: 99 } })).allowed).toBe(false));
  it("historian creates postmortem", async () => expect((await runHistorianPostmortem("thesis-graze-watch")).success).toBe(true));
});
