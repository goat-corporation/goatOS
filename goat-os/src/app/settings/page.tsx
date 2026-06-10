import { DashboardShell } from "@/components/layout/DashboardShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { getGoatClient } from "@/lib/goat/client";
import { env } from "@/lib/env";
import { tokenAdapters } from "@/lib/tokens/adapters";

export default async function SettingsPage() {
  const health = await Promise.all(tokenAdapters.map((adapter) => adapter.health()));
  const goat = getGoatClient();
  return <DashboardShell><h1 className="text-2xl font-semibold">Settings</h1><div className="mt-5 grid gap-3 md:grid-cols-4"><MetricCard label="Mock mode" value={String(env.MOCK_MODE)} /><MetricCard label="Dry-run" value={String(env.DRY_RUN_ONLY)} /><MetricCard label="GOAT" value={goat.mode} /><MetricCard label="LLM provider" value={env.llmLiveEnabled ? env.OPENAI_MODEL : "mock"} /></div><div className="mt-6 rounded border border-line bg-panel p-4"><div className="font-semibold">Configuration</div><dl className="mt-3 grid gap-2 text-sm md:grid-cols-2"><dt className="text-zinc-500">RPC endpoint</dt><dd className="font-mono">{env.SOLANA_RPC_URL}</dd><dt className="text-zinc-500">Wallet configuration</dt><dd className="font-mono">{env.GOAT_WALLET_SECRET ? "server-only secret configured" : "mock deterministic wallets"}</dd><dt className="text-zinc-500">GOAT SDK</dt><dd className="font-mono">{env.goatLiveEnabled ? "live enabled" : "mock wrapper"}</dd></dl></div><div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{health.map((item) => <div key={item.name} className="rounded border border-line bg-panel p-4"><div className="font-semibold">{item.name}</div><div className="mt-2 font-mono text-xs text-signal">{item.mode}</div><p className="mt-2 text-sm text-zinc-400">{item.message}</p></div>)}</div></DashboardShell>;
}
