import { levelForScore } from "@/lib/tokens/risk-score";

export function RiskScoreBadge({ score }: { score: number }) {
  const level = levelForScore(score);
  const color = score <= 20 ? "border-signal/40 bg-signal/10 text-signal" : score <= 40 ? "border-blue/40 bg-blue/10 text-blue" : score <= 60 ? "border-solar/40 bg-solar/10 text-solar" : "border-danger/40 bg-danger/10 text-danger";
  return <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${color}`}><span>{score}</span><span className="text-mineral-500">{level}</span></span>;
}
