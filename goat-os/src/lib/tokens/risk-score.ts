import type { RiskScoreResult, TokenProfile } from "@/types/tokens";

export function scoreTokenRisk(token: TokenProfile): RiskScoreResult {
  const reasons: string[] = [];
  const warnings: string[] = [];
  let score = 0;

  if (token.top10HolderPercent > 60) add(28, "Top 10 holders control more than 60%.");
  else if (token.top10HolderPercent > 40) add(20, "Top 10 holder concentration is high.");
  else if (token.top10HolderPercent > 25) add(10, "Top 10 holder concentration is moderate.");

  if (token.liquidityUsd < 25000) add(20, "Liquidity is shallow.");
  else if (token.liquidityUsd < 75000) add(12, "Liquidity is thin for active trading.");

  const ageHours = (Date.now() - token.createdAt.getTime()) / 36e5;
  if (ageHours < 2) add(14, "Token is extremely new.");
  else if (ageHours < 24) add(8, "Token is less than one day old.");

  if (token.devWalletStatus === "DUMPED") add(25, "Developer wallet appears to have dumped.");
  if (token.devWalletStatus === "SUSPICIOUS") add(16, "Developer wallet signals are suspicious.");
  if (token.lpStatus === "UNLOCKED" || token.lpStatus === "LOW_LIQUIDITY") add(12, "LP status increases exit risk.");
  if (token.migrationStatus === "FAILED") add(12, "Migration failed.");
  if (token.bundleRisk > 70) add(16, "Bundle risk is severe.");
  else if (token.bundleRisk > 40) add(10, "Bundle risk is elevated.");
  if (token.volume1hUsd > token.liquidityUsd * 1.5 && token.socialVelocity < 40) add(10, "Volume is high without matching social velocity.");
  if (token.socialVelocity > 85 && token.liquidityUsd < 60000) add(8, "Social velocity may be outrunning liquidity.");

  score = Math.min(100, Math.max(0, Math.round(score)));
  if (score >= 61) warnings.push("Policy should require rejection or manual review before any financial action.");
  if (score >= 81) warnings.push("Extreme risk: avoid execution unless governance explicitly changes mandate.");

  return { tokenMint: token.mint, score, level: levelForScore(score), reasons: reasons.length ? reasons : ["No severe visible risk in mock profile."], warnings };

  function add(points: number, reason: string) {
    score += points;
    reasons.push(reason);
  }
}

export function levelForScore(score: number): RiskScoreResult["level"] {
  if (score <= 20) return "LOW";
  if (score <= 40) return "MODERATE";
  if (score <= 60) return "HIGH";
  if (score <= 80) return "SEVERE";
  return "EXTREME";
}
