import { EmergencyPauseButton } from "@/components/governance/EmergencyPauseButton";
import { MandateSelector } from "@/components/governance/MandateSelector";
import { PolicyPanel } from "@/components/governance/PolicyPanel";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SectionHeader, Surface } from "@/components/ui/Surface";
import { store } from "@/lib/mock-store";

export default function GovernancePage() {
  const paused = store.policies.some((policy) => policy.emergencyPaused);
  return <DashboardShell><SectionHeader eyebrow="governor rail" title="Governance" meta="Mandates modify server-side policy. Dry-run and human approval remain enabled by default." action={<EmergencyPauseButton paused={paused} />} /><Surface active><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Active mandate</div><div className="mt-3 text-3xl font-medium text-mineral-50">{store.mandate.type}</div><div className="mt-5"><MandateSelector active={store.mandate.type} /></div></Surface><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{store.policies.map((policy) => <PolicyPanel key={policy.agentId} policy={policy} />)}</div></DashboardShell>;
}
