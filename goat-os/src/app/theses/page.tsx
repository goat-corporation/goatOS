import { DashboardShell } from "@/components/layout/DashboardShell";
import { ThesisCard } from "@/components/theses/ThesisCard";
import { SectionHeader } from "@/components/ui/Surface";
import { getAllTheses } from "@/lib/theses/create";

export default async function ThesesPage() {
  const theses = await getAllTheses();
  return <DashboardShell><SectionHeader eyebrow="research ledger" title="Public Thesis Feed" meta="Every meaningful recommendation becomes a traceable thesis with invalidations and outcomes." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{theses.map((thesis) => <ThesisCard key={thesis.id} thesis={thesis} />)}</div></DashboardShell>;
}
