import { TradeProposalSchema } from "@/lib/agents/schemas";
import { structuredOutput } from "@/lib/llm/structured-output";
import { createThesis } from "@/lib/theses/create";
import { getTokenByMint } from "@/lib/tokens/profile";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";

export async function runTraderAgent(tokenMint: string) {
  const token = await getTokenByMint(tokenMint);
  if (!token) throw new Error("Token not found.");
  const risk = scoreTokenRisk(token);
  const proposal = await structuredOutput(TradeProposalSchema, {
    tokenMint,
    actionType: "BUY_PROPOSAL" as const,
    confidence: risk.score <= 40 ? 0.58 : 0.31,
    riskScore: risk.score,
    positionSizeSol: risk.score <= 40 ? 0.05 : 0.01,
    maxLossSol: risk.score <= 40 ? 0.025 : 0.005,
    timeHorizonMinutes: 240,
    reasons: [`${token.symbol} meets mock liquidity and social watch criteria.`, "Proposal remains bounded and must pass policy, simulation, and approval."],
    invalidations: ["Risk score exceeds policy max.", "Liquidity drops more than 40%.", "Emergency pause is enabled."],
    sourceLinks: Object.values(token.links).filter(Boolean)
  });
  return createThesis({
    agentId: "trader-01",
    tokenMint,
    actionType: proposal.actionType,
    confidence: proposal.confidence,
    riskScore: proposal.riskScore,
    positionSizeSol: proposal.positionSizeSol,
    maxLossSol: proposal.maxLossSol,
    timeHorizonMinutes: proposal.timeHorizonMinutes,
    reasons: proposal.reasons,
    invalidations: proposal.invalidations,
    sourceLinks: proposal.sourceLinks ?? []
  });
}
