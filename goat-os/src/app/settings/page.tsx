import { DashboardShell } from "@/components/layout/DashboardShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader, Surface } from "@/components/ui/Surface";
import { getGoatClient } from "@/lib/goat/client";
import { env } from "@/lib/env";
import { tokenAdapters } from "@/lib/tokens/adapters";

export default async function SettingsPage() {
  const health = await Promise.all(tokenAdapters.map((adapter) => adapter.health()));
  const goat = getGoatClient();
  return <DashboardShell><SectionHeader eyebrow="system configuration" title="Settings" meta="Adapter health, wallet posture, RPC routing, LLM provider, and GOAT SDK mode." /><div className="grid gap-3 md:grid-cols-4"><MetricCard label="Mock mode" value={String(env.MOCK_MODE)} /><MetricCard label="Dry-run" value={String(env.DRY_RUN_ONLY)} /><MetricCard label="GOAT" value={goat.mode} tone="good" /><MetricCard label="LLM provider" value={env.llmLiveEnabled ? env.OPENAI_MODEL : "mock"} /></div><Surface className="mt-6"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Configuration</div><dl className="mt-4 grid gap-3 text-sm md:grid-cols-2"><dt className="text-mineral-500">RPC endpoint</dt><dd className="font-mono text-mineral-100">{env.SOLANA_RPC_URL}</dd><dt className="text-mineral-500">Wallet configuration</dt><dd className="font-mono text-mineral-100">{env.GOAT_WALLET_SECRET ? "server-only secret configured" : "mock deterministic wallets"}</dd><dt className="text-mineral-500">GOAT SDK</dt><dd className="font-mono text-signal">{env.goatLiveEnabled ? "live enabled" : "mock wrapper"}</dd></dl></Surface><div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{health.map((item) => <Surface key={item.name}><div className="text-lg font-medium">{item.name}</div><div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{item.mode}</div><p className="mt-3 text-sm text-mineral-300">{item.message}</p></Surface>)}</div></DashboardShell>;
}
