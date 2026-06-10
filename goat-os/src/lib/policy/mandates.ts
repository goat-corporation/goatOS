import type { AgentPolicy, GovernanceMandate } from "@/lib/policy/types";

export function policyForMandate(basePolicy: AgentPolicy, mandate: GovernanceMandate): AgentPolicy {
  const policy = { ...basePolicy };
  switch (mandate.type) {
    case "GRAZE":
      return { ...policy, allowedActions: [], maxTradeSizeSol: 0, maxDailySpendSol: 0, dryRunOnly: true, autonomousModeEnabled: false };
    case "NIBBLE":
      return { ...policy, maxTradeSizeSol: Math.min(policy.maxTradeSizeSol || 0.05, 0.1), maxDailySpendSol: Math.min(policy.maxDailySpendSol || 0.25, 0.25), maxRiskScore: Math.min(policy.maxRiskScore, 40), dryRunOnly: true };
    case "STAMPEDE":
      return { ...policy, maxTradeSizeSol: Math.min(policy.maxTradeSizeSol || 0.25, 0.35), maxDailySpendSol: Math.min(policy.maxDailySpendSol || 1, 1), maxRiskScore: Math.min(policy.maxRiskScore, 65), dryRunOnly: true };
    case "PATRON":
      return { ...policy, allowedActions: policy.allowedActions.filter((a) => a === "PAY_BOUNTY" || a === "SEND_PAYMENT"), maxDailySpendSol: Math.min(policy.maxDailySpendSol || 1, 2), maxOpenPositions: 0, dryRunOnly: true };
    case "PURGE":
      return { ...policy, allowedActions: [], maxTradeSizeSol: 0, maxDailySpendSol: 0, maxRiskScore: 100, dryRunOnly: true, autonomousModeEnabled: false };
    case "ARCHIVE":
      return { ...policy, allowedActions: [], maxTradeSizeSol: 0, maxDailySpendSol: 0, dryRunOnly: true, autonomousModeEnabled: false };
  }
}
