import type { Thesis } from "@/types/theses";

export function ThesisTimeline({ thesis }: { thesis: Thesis }) {
  const steps = ["OPEN", "APPROVED", "EXECUTED", "RESOLVED"];
  return <div className="rounded border border-line bg-panel p-4"><div className="font-semibold">Timeline</div><div className="mt-3 flex flex-wrap gap-2">{steps.map((step) => <span key={step} className={`rounded px-2 py-1 font-mono text-xs ${thesis.status === step ? "bg-signal/15 text-signal" : "bg-field text-zinc-500"}`}>{step}</span>)}</div></div>;
}
