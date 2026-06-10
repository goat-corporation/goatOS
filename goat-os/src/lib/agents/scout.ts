import { createThesis } from "@/lib/theses/create";
import { getTokens } from "@/lib/tokens/profile";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";

export async function runScoutAgent() {
  const tokens = await getTokens();
  const candidate = tokens.sort((a, b) => b.socialVelocity - a.socialVelocity)[0];
  const risk = scoreTokenRisk(candidate);
  return createThesis({
    agentId: "scout-01",
    tokenMint: candidate.mint,
    actionType: "WATCHLIST",
    confidence: Math.max(0.3, Math.min(0.78, candidate.socialVelocity / 120)),
    riskScore: risk.score,
    reasons: [`${candidate.symbol} has the highest current social velocity in the local feed.`, "Candidate routed to Risk Agent before any financial action."],
    invalidations: ["Risk score moves above 60.", "Liquidity falls below 25k USD."],
    sourceLinks: Object.values(candidate.links).filter(Boolean)
  });
}
