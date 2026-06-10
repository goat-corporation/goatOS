import type { Thesis } from "@/types/theses";
import { RiskScoreBadge } from "@/components/ui/RiskScoreBadge";

export function ThesisCard({ thesis }: { thesis: Thesis }) {
  return (
    <a href={`/theses/${thesis.id}`} className="block rounded-2xl border border-line bg-card p-5 transition duration-150 hover:border-signal/45 hover:bg-elevated/70">
      <div className="flex items-start justify-between gap-3">
        <div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-solar">{thesis.actionType}</div><div className="mt-2 max-w-[20rem] truncate text-base font-medium text-mineral-50">{thesis.tokenMint ?? "System thesis"}</div></div>
        <span className="rounded-md border border-line-strong bg-panel px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-mineral-300">{thesis.status}</span>
      </div>
      <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-mineral-300">{thesis.reasons[0]}</p>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4 font-mono text-[11px] text-mineral-500"><span>confidence {Math.round(thesis.confidence * 100)}%</span>{typeof thesis.riskScore === "number" && <RiskScoreBadge score={thesis.riskScore} />}</div>
    </a>
  );
}
