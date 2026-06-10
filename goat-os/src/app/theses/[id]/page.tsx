import { notFound } from "next/navigation";
import { SimulationResult } from "@/components/governance/SimulationResult";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ThesisTimeline } from "@/components/theses/ThesisTimeline";
import { store } from "@/lib/mock-store";
import { getThesisById } from "@/lib/theses/create";

export default async function ThesisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thesis = await getThesisById(id);
  if (!thesis) notFound();
  const approval = store.approvals.find((item) => item.thesisId === thesis.id);
  return <DashboardShell><h1 className="text-2xl font-semibold">{thesis.actionType}</h1><p className="mt-2 font-mono text-xs text-zinc-500">{thesis.id}</p><div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]"><div className="rounded border border-line bg-panel p-4"><div className="font-semibold">Rationale</div><ul className="mt-3 space-y-2 text-sm text-zinc-300">{thesis.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><div className="mt-5 font-semibold">Invalidations</div><ul className="mt-3 space-y-2 text-sm text-zinc-400">{thesis.invalidations.map((item) => <li key={item}>{item}</li>)}</ul><div className="mt-5 font-semibold">Outcome</div><p className="mt-2 text-sm text-zinc-400">{thesis.outcome ?? "Unresolved"} {thesis.postmortem ? `· ${thesis.postmortem}` : ""}</p></div><div className="grid gap-4"><ThesisTimeline thesis={thesis} /><div className="rounded border border-line bg-panel p-4 text-sm"><div className="font-semibold">Policy decision</div><p className="mt-2 text-zinc-400">{approval?.policyDecision.reason ?? "No execution policy decision attached."}</p><div className="mt-3 font-mono text-xs text-amber">approval {approval?.status ?? "none"}</div></div><SimulationResult result={approval?.simulationResult} /></div></div></DashboardShell>;
}
