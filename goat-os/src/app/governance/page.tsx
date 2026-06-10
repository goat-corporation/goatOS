import { EmergencyPauseButton } from "@/components/governance/EmergencyPauseButton";
import { MandateSelector } from "@/components/governance/MandateSelector";
import { PolicyPanel } from "@/components/governance/PolicyPanel";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/mock-store";

export default function GovernancePage() {
  const paused = store.policies.some((policy) => policy.emergencyPaused);
  return <DashboardShell><div className="flex items-start justify-between gap-4"><div><h1 className="text-2xl font-semibold">Governance</h1><p className="mt-2 text-sm text-zinc-400">Mandates modify server-side policy. Dry-run and human approval remain enabled by default.</p></div><EmergencyPauseButton paused={paused} /></div><div className="mt-6 rounded border border-line bg-panel p-4"><div className="font-semibold">Active mandate: {store.mandate.type}</div><div className="mt-4"><MandateSelector active={store.mandate.type} /></div></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{store.policies.map((policy) => <PolicyPanel key={policy.agentId} policy={policy} />)}</div></DashboardShell>;
}
