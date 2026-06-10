import type { TokenProfile } from "@/types/tokens";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";
import { RiskScoreBadge } from "@/components/ui/RiskScoreBadge";

export function TokenRiskCard({ token }: { token: TokenProfile }) {
  const risk = scoreTokenRisk(token);
  return (
    <div className="rounded border border-line bg-panel p-4">
      <div className="flex items-center justify-between">
        <div><div className="font-semibold">{token.symbol}</div><div className="font-mono text-xs text-zinc-500">{token.mint}</div></div>
        <RiskScoreBadge score={risk.score} />
      </div>
      <ul className="mt-3 space-y-1 text-sm text-zinc-300">{risk.reasons.slice(0, 3).map((reason) => <li key={reason}>{reason}</li>)}</ul>
    </div>
  );
}
