import type { TokenProfile } from "@/types/tokens";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";
import { RiskScoreBadge } from "@/components/ui/RiskScoreBadge";
import { PacketBar, Surface } from "@/components/ui/Surface";

export function TokenRiskCard({ token }: { token: TokenProfile }) {
  const risk = scoreTokenRisk(token);
  return (
    <Surface className="p-5">
      <div className="flex items-center justify-between">
        <div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mineral-500">token risk node</div><div className="mt-2 text-xl font-medium">{token.symbol}</div><div className="mt-1 max-w-[14rem] truncate font-mono text-[11px] text-mineral-500">{token.mint}</div></div>
        <RiskScoreBadge score={risk.score} />
      </div>
      <div className="mt-5"><PacketBar value={risk.score} tone={risk.score > 60 ? "red" : risk.score > 40 ? "solar" : "mint"} /></div>
      <ul className="mt-4 space-y-2 text-sm leading-5 text-mineral-300">{risk.reasons.slice(0, 3).map((reason) => <li key={reason} className="border-l border-line pl-3">{reason}</li>)}</ul>
    </Surface>
  );
}
