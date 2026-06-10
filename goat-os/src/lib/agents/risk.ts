import { createThesis } from "@/lib/theses/create";
import { getTokenByMint } from "@/lib/tokens/profile";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";

export async function runRiskAgent(tokenMint: string) {
  const token = await getTokenByMint(tokenMint);
  if (!token) throw new Error("Token not found.");
  const risk = scoreTokenRisk(token);
  return createThesis({
    agentId: "risk-01",
    tokenMint,
    actionType: risk.score > 60 ? "REJECT" : "WATCHLIST",
    confidence: risk.score > 60 ? 0.8 : 0.62,
    riskScore: risk.score,
    reasons: risk.reasons,
    invalidations: risk.score > 60 ? ["Holder concentration drops below 30%.", "LP status improves with sustained liquidity."] : ["Risk score rises above 60.", "Dev wallet status changes to suspicious or dumped."],
    sourceLinks: Object.values(token.links).filter(Boolean)
  });
}
