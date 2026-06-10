import { DashboardShell } from "@/components/layout/DashboardShell";
import { ThesisCard } from "@/components/theses/ThesisCard";
import { getAllTheses } from "@/lib/theses/create";

export default async function ThesesPage() {
  const theses = await getAllTheses();
  return <DashboardShell><h1 className="text-2xl font-semibold">Public Thesis Feed</h1><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{theses.map((thesis) => <ThesisCard key={thesis.id} thesis={thesis} />)}</div></DashboardShell>;
}
