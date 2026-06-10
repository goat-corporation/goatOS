import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ActionLogFeed } from "@/components/logs/ActionLogFeed";
import { ThesisCard } from "@/components/theses/ThesisCard";
import { TokenRiskCard } from "@/components/tokens/TokenRiskCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { getActionLogs } from "@/lib/logs/logger";
import { getThesesForToken } from "@/lib/theses/create";
import { getTokenByMint } from "@/lib/tokens/profile";

export default async function TokenDetailPage({ params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  const token = await getTokenByMint(mint);
  if (!token) notFound();
  const [theses, logs] = await Promise.all([getThesesForToken(mint), getActionLogs()]);
  return <DashboardShell><div className="flex items-start justify-between"><div><h1 className="text-2xl font-semibold">{token.symbol}</h1><p className="font-mono text-xs text-zinc-500">{token.mint}</p></div><div className="flex gap-2"><form action={`/api/tokens/${mint}/risk-review`} method="post"><button className="rounded border border-line px-3 py-2 text-sm">Create risk review</button></form><form action="/api/agents/trader-01/run" method="post"><input type="hidden" name="tokenMint" value={mint} /><button className="rounded bg-signal px-3 py-2 text-sm font-semibold text-field">Propose thesis</button></form></div></div><div className="mt-6 grid gap-3 md:grid-cols-4"><MetricCard label="Market cap" value={`$${token.marketCapUsd.toLocaleString()}`} /><MetricCard label="Liquidity" value={`$${token.liquidityUsd.toLocaleString()}`} /><MetricCard label="Top 10" value={`${token.top10HolderPercent}%`} /><MetricCard label="Social velocity" value={token.socialVelocity} /></div><div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><TokenRiskCard token={token} /><div className="rounded border border-line bg-panel p-4 text-sm text-zinc-300">Launch data: {token.migrationStatus} · LP {token.lpStatus} · dev wallet {token.devWalletStatus} · bundle risk {token.bundleRisk}</div></div><div className="mt-6 grid gap-4 md:grid-cols-2">{theses.map((thesis) => <ThesisCard key={thesis.id} thesis={thesis} />)}</div><div className="mt-6"><ActionLogFeed logs={logs.filter((log) => log.tokenMint === mint)} /></div></DashboardShell>;
}
