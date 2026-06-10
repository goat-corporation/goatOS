import type { Thesis } from "@/types/theses";
import { RiskScoreBadge } from "@/components/ui/RiskScoreBadge";

export function ThesisCard({ thesis }: { thesis: Thesis }) {
  return (
    <a href={`/theses/${thesis.id}`} className="block rounded border border-line bg-panel p-4 hover:border-signal/60">
      <div className="flex items-start justify-between gap-3">
        <div><div className="font-mono text-xs text-amber">{thesis.actionType}</div><div className="font-semibold">{thesis.tokenMint ?? "System thesis"}</div></div>
        <span className="rounded bg-field px-2 py-1 font-mono text-xs text-zinc-300">{thesis.status}</span>
      </div>
      <p className="mt-3 text-sm text-zinc-300">{thesis.reasons[0]}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500"><span>confidence {Math.round(thesis.confidence * 100)}%</span>{typeof thesis.riskScore === "number" && <RiskScoreBadge score={thesis.riskScore} />}</div>
    </a>
  );
}
