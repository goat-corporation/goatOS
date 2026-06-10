import type { GoatAction } from "@/lib/goat/actions";
import type { AgentPolicy, GovernanceMandate, PolicyContext, PolicyDecision } from "@/lib/policy/types";
import { policyForMandate } from "@/lib/policy/mandates";

export function evaluatePolicy(action: GoatAction, basePolicy: AgentPolicy, context: PolicyContext = {}, mandate?: GovernanceMandate): PolicyDecision {
  const policy = mandate ? policyForMandate(basePolicy, mandate) : basePolicy;
  const amountSol = action.amountSol ?? 0;
  const riskScore = context.riskScore ?? Number(action.metadata?.riskScore ?? 0);

  if (policy.emergencyPaused) return reject("Emergency pause is enabled.");
  if (policy.dryRunOnly && context.liveExecutionRequested) return reject("Dry-run mode blocks live execution.");
  if (!policy.allowedActions.includes(action.type)) return reject(`Action ${action.type} is not allowed for ${policy.agentId}.`);
  if (action.tokenMint && policy.blockedTokenMints.includes(action.tokenMint)) return reject("Token is blocked by policy.");
  if (policy.allowedTokenMints.length > 0 && action.tokenMint && !policy.allowedTokenMints.includes(action.tokenMint)) return reject("Token is not on the allowlist.");
  if (action.recipient && policy.blockedWallets.includes(action.recipient)) return reject("Recipient wallet is blocked by policy.");
  if (amountSol > policy.maxTradeSizeSol && ["BUY_TOKEN", "SELL_TOKEN", "SWAP"].includes(action.type)) {
    return { allowed: true, reason: `Trade size capped from ${amountSol} SOL to ${policy.maxTradeSizeSol} SOL.`, requiredApproval: true, modifiedAction: { ...action, amountSol: policy.maxTradeSizeSol } };
  }
  if ((context.dailySpendSol ?? 0) + amountSol > policy.maxDailySpendSol) return reject("Daily spend limit would be exceeded.");
  if ((context.openPositions ?? 0) >= policy.maxOpenPositions && ["BUY_TOKEN", "SWAP"].includes(action.type)) return reject("Open position limit reached.");
  if (riskScore < policy.minRiskScore || riskScore > policy.maxRiskScore) return reject(`Risk score ${riskScore} is outside policy range ${policy.minRiskScore}-${policy.maxRiskScore}.`);
  if ((context.minutesSinceLastAction ?? policy.cooldownMinutes) < policy.cooldownMinutes) return reject("Cooldown period has not elapsed.");

  const requiredApproval = !policy.autonomousModeEnabled || amountSol >= policy.requireHumanApprovalAboveSol || policy.dryRunOnly;
  if (!policy.autonomousModeEnabled && !requiredApproval) return reject("Autonomous mode is disabled.");

  return { allowed: true, reason: requiredApproval ? "Policy allows simulation and requires human approval." : "Policy allows autonomous execution.", requiredApproval };
}

function reject(reason: string): PolicyDecision {
  return { allowed: false, reason, requiredApproval: false };
}
