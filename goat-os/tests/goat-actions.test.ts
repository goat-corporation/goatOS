import { describe, expect, it } from "vitest";
import { executeGoatAction, simulateGoatAction } from "@/lib/goat/actions";
import { evaluatePolicy } from "@/lib/policy/engine";
import { basePolicies } from "@/lib/tokens/mock-data";

const action = { id: "test-action", agentId: "trader-01", type: "BUY_TOKEN" as const, chain: "solana" as const, tokenMint: "Goat111111111111111111111111111111111111111", amountSol: 0.01, metadata: { riskScore: 10 } };

describe("GOAT actions", () => {
  it("runs mock simulation", async () => expect((await simulateGoatAction(action)).success).toBe(true));
  it("runs mock execution", async () => expect((await executeGoatAction(action)).txHash).toContain("mock-solana-tx"));
  it("handles failed execution", async () => expect((await executeGoatAction({ ...action, metadata: { forceExecutionFailure: true } })).success).toBe(false));
  it("uses policy wrapper path", () => expect(evaluatePolicy(action, basePolicies.find((p) => p.agentId === "trader-01")!, { minutesSinceLastAction: 60 }).allowed).toBe(true));
});
