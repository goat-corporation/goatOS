import { notFound } from "next/navigation";
import { SimulationResult } from "@/components/governance/SimulationResult";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ThesisTimeline } from "@/components/theses/ThesisTimeline";
import { SectionHeader, Surface } from "@/components/ui/Surface";
import { store } from "@/lib/mock-store";
import { getThesisById } from "@/lib/theses/create";

export default async function ThesisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thesis = await getThesisById(id);
  if (!thesis) notFound();
  const approval = store.approvals.find((item) => item.thesisId === thesis.id);
  return <DashboardShell><SectionHeader eyebrow="thesis detail" title={thesis.actionType} meta={thesis.id} /><div className="grid gap-5 xl:grid-cols-12"><Surface className="xl:col-span-7"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Rationale</div><ul className="mt-4 space-y-3 text-sm leading-6 text-mineral-300">{thesis.reasons.map((reason) => <li key={reason} className="border-l border-line pl-3">{reason}</li>)}</ul><div className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Invalidations</div><ul className="mt-4 space-y-3 text-sm leading-6 text-mineral-300">{thesis.invalidations.map((item) => <li key={item} className="border-l border-danger/35 pl-3">{item}</li>)}</ul><div className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Outcome</div><p className="mt-3 text-sm leading-6 text-mineral-300">{thesis.outcome ?? "Unresolved"} {thesis.postmortem ? `· ${thesis.postmortem}` : ""}</p></Surface><div className="grid gap-4 xl:col-span-5"><ThesisTimeline thesis={thesis} /><Surface><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Policy decision</div><p className="mt-3 text-sm leading-6 text-mineral-300">{approval?.policyDecision.reason ?? "No execution policy decision attached."}</p><div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-solar">approval {approval?.status ?? "none"}</div></Surface><SimulationResult result={approval?.simulationResult} /></div></div></DashboardShell>;
}
