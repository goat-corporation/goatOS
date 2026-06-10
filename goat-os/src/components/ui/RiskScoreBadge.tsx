import { levelForScore } from "@/lib/tokens/risk-score";

export function RiskScoreBadge({ score }: { score: number }) {
  const level = levelForScore(score);
  const color = score <= 20 ? "bg-signal/15 text-signal" : score <= 40 ? "bg-cyan-400/15 text-cyan-300" : score <= 60 ? "bg-amber/15 text-amber" : "bg-danger/15 text-danger";
  return <span className={`rounded px-2 py-1 font-mono text-xs ${color}`}>{score} {level}</span>;
}
