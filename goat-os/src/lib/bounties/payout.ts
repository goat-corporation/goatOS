import { createApprovalRequest } from "@/lib/approvals/create";
import { simulateGoatAction } from "@/lib/goat/actions";
import { evaluatePolicy } from "@/lib/policy/engine";
import { store } from "@/lib/mock-store";
import { logEvent } from "@/lib/logs/logger";

export async function proposeBountyPayout(bountyId: string) {
  const bounty = store.bounties.find((item) => item.id === bountyId);
  const policy = store.policies.find((item) => item.agentId === "patron-01");
  if (!bounty || !policy) return undefined;
  if (bounty.status === "PAID") throw new Error("Bounty already paid.");
  const action = { id: `act-pay-${bounty.id}`, agentId: "patron-01", type: "PAY_BOUNTY" as const, chain: "solana" as const, amountSol: bounty.rewardSol, recipient: bounty.winnerId ?? "MockWinner111111111111111111111111111111" };
  const decision = evaluatePolicy(action, policy, { dailySpendSol: 0, minutesSinceLastAction: 60 }, store.mandate);
  if (!decision.allowed) {
    await logEvent({ type: "POLICY_REJECTED_ACTION", agentId: "governor-01", bountyId, payload: decision });
    return { decision };
  }
  const simulation = await simulateGoatAction(decision.modifiedAction ?? action);
  const approval = await createApprovalRequest({ action: decision.modifiedAction ?? action, policyDecision: decision, simulationResult: simulation });
  bounty.payoutState = "PROPOSED";
  await logEvent({ type: "BOUNTY_PAYOUT_PROPOSED", agentId: "patron-01", bountyId, payload: { approvalId: approval.id } });
  return { decision, simulation, approval };
}
