import type { TokenProfile } from "@/types/tokens";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";
import { RiskScoreBadge } from "@/components/ui/RiskScoreBadge";

export function TokenTable({ tokens }: { tokens: TokenProfile[] }) {
  return (
    <div className="overflow-hidden rounded border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-field text-xs uppercase text-zinc-500"><tr><th className="p-3">Token</th><th>Market cap</th><th>Liquidity</th><th>Volume 1h</th><th>Age</th><th>Risk</th><th>Social</th><th>Top 10</th><th>Thesis</th></tr></thead>
        <tbody className="divide-y divide-line bg-panel">
          {tokens.map((token) => {
            const risk = scoreTokenRisk(token);
            const ageHours = Math.round((Date.now() - token.createdAt.getTime()) / 36e5);
            return (
              <tr key={token.mint} className="hover:bg-field/80">
                <td className="p-3"><a href={`/tokens/${token.mint}`} className="font-semibold text-signal">{token.symbol}</a><div className="font-mono text-xs text-zinc-500">{token.mint.slice(0, 12)}...</div></td>
                <td className="font-mono">${token.marketCapUsd.toLocaleString()}</td>
                <td className="font-mono">${token.liquidityUsd.toLocaleString()}</td>
                <td className="font-mono">${token.volume1hUsd.toLocaleString()}</td>
                <td className="font-mono">{ageHours}h</td>
                <td><RiskScoreBadge score={risk.score} /></td>
                <td className="font-mono">{token.socialVelocity}</td>
                <td className="font-mono">{token.top10HolderPercent}%</td>
                <td className="text-zinc-400">open</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
