import type { GoatAction } from "@/lib/goat/actions";
import { evaluatePolicy } from "@/lib/policy/engine";
import { store } from "@/lib/mock-store";
import { logEvent } from "@/lib/logs/logger";

export async function runGovernorAgent(action: GoatAction) {
  const policy = store.policies.find((item) => item.agentId === action.agentId);
  if (!policy) return { allowed: false, reason: "No policy found for agent.", requiredApproval: false };
  const decision = evaluatePolicy(action, policy, { riskScore: Number(action.metadata?.riskScore ?? 0), dailySpendSol: 0, openPositions: 0, minutesSinceLastAction: 60 }, store.mandate);
  await logEvent({ type: decision.allowed ? "POLICY_APPROVED_ACTION" : "POLICY_REJECTED_ACTION", agentId: "governor-01", tokenMint: action.tokenMint, payload: decision });
  return decision;
}
