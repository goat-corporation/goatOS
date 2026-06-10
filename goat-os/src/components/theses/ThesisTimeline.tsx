import type { Thesis } from "@/types/theses";

export function ThesisTimeline({ thesis }: { thesis: Thesis }) {
  const steps = ["OPEN", "APPROVED", "EXECUTED", "RESOLVED"];
  return <div className="rounded-2xl border border-line bg-card p-5"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Timeline</div><div className="mt-4 flex flex-wrap gap-2">{steps.map((step) => <span key={step} className={`rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${thesis.status === step ? "border-signal/45 bg-signal/10 text-signal" : "border-line-strong bg-control text-mineral-500"}`}>{step}</span>)}</div></div>;
}
