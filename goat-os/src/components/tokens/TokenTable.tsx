import type { TokenProfile } from "@/types/tokens";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";
import { RiskScoreBadge } from "@/components/ui/RiskScoreBadge";

export function TokenTable({ tokens }: { tokens: TokenProfile[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead className="border-b border-line bg-panel font-mono text-[10px] uppercase tracking-[0.18em] text-mineral-500"><tr><th className="p-4">Token</th><th>Market cap</th><th>Liquidity</th><th>Volume 1h</th><th>Age</th><th>Risk</th><th>Social</th><th>Top 10</th><th>Thesis</th></tr></thead>
        <tbody className="divide-y divide-line">
          {tokens.map((token) => {
            const risk = scoreTokenRisk(token);
            const ageHours = Math.round((Date.now() - token.createdAt.getTime()) / 36e5);
            return (
              <tr key={token.mint} className="text-mineral-300 transition hover:bg-elevated/55">
                <td className="p-4"><a href={`/tokens/${token.mint}`} className="font-medium text-signal">{token.symbol}</a><div className="font-mono text-[11px] text-mineral-500">{token.mint.slice(0, 12)}...</div></td>
                <td className="font-mono text-mineral-100">${token.marketCapUsd.toLocaleString()}</td>
                <td className="font-mono">${token.liquidityUsd.toLocaleString()}</td>
                <td className="font-mono">${token.volume1hUsd.toLocaleString()}</td>
                <td className="font-mono">{ageHours}h</td>
                <td><RiskScoreBadge score={risk.score} /></td>
                <td className="font-mono">{token.socialVelocity}</td>
                <td className="font-mono">{token.top10HolderPercent}%</td>
                <td className="font-mono text-[11px] uppercase text-mineral-500">open</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
