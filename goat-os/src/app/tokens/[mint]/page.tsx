import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ActionLogFeed } from "@/components/logs/ActionLogFeed";
import { ThesisCard } from "@/components/theses/ThesisCard";
import { TokenRiskCard } from "@/components/tokens/TokenRiskCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader, Surface } from "@/components/ui/Surface";
import { getActionLogs } from "@/lib/logs/logger";
import { getThesesForToken } from "@/lib/theses/create";
import { getTokenByMint } from "@/lib/tokens/profile";

export default async function TokenDetailPage({ params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  const token = await getTokenByMint(mint);
  if (!token) notFound();
  const [theses, logs] = await Promise.all([getThesesForToken(mint), getActionLogs()]);
  return (
    <DashboardShell>
      <SectionHeader
        eyebrow="token profile"
        title={token.symbol}
        meta={token.mint}
        action={<div className="flex gap-2"><form action={`/api/tokens/${mint}/risk-review`} method="post"><button className="rounded-xl border border-line-strong bg-control px-3 py-2 text-xs text-mineral-100 transition hover:border-signal/45">Create risk review</button></form><form action="/api/agents/trader-01/run" method="post"><input type="hidden" name="tokenMint" value={mint} /><button className="rounded-xl border border-signal/45 bg-signal/14 px-3 py-2 text-xs font-medium text-signal transition hover:bg-signal/20">Propose thesis</button></form></div>}
      />
      <div className="grid gap-4 md:grid-cols-4"><MetricCard label="Market cap" value={`$${token.marketCapUsd.toLocaleString()}`} /><MetricCard label="Liquidity" value={`$${token.liquidityUsd.toLocaleString()}`} tone="good" /><MetricCard label="Top 10" value={`${token.top10HolderPercent}%`} tone="warn" /><MetricCard label="Social velocity" value={token.socialVelocity} unit="index" tone="blue" /></div>
      <div className="mt-6 grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-4"><TokenRiskCard token={token} /></div>
        <Surface className="xl:col-span-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Launch diagnostics</div>
          <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
            <dt className="text-mineral-500">Migration</dt><dd className="font-mono text-mineral-100">{token.migrationStatus}</dd>
            <dt className="text-mineral-500">LP status</dt><dd className="font-mono text-mineral-100">{token.lpStatus}</dd>
            <dt className="text-mineral-500">Dev wallet</dt><dd className="font-mono text-mineral-100">{token.devWalletStatus}</dd>
            <dt className="text-mineral-500">Bundle risk</dt><dd className="font-mono text-solar">{token.bundleRisk}</dd>
          </dl>
        </Surface>
      </div>
      <div className="mt-8 grid gap-5 xl:grid-cols-12">
        <section className="xl:col-span-7"><SectionHeader eyebrow="related theses" title="Token research" /><div className="grid gap-4 md:grid-cols-2">{theses.map((thesis) => <ThesisCard key={thesis.id} thesis={thesis} />)}</div></section>
        <aside className="xl:col-span-5"><ActionLogFeed logs={logs.filter((log) => log.tokenMint === mint)} /></aside>
      </div>
    </DashboardShell>
  );
}
