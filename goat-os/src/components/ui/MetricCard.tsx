import { clsx } from "clsx";

export function MetricCard({
  label,
  value,
  tone = "neutral",
  unit,
  detail
}: {
  label: string;
  value: string | number;
  tone?: "neutral" | "good" | "warn" | "bad" | "blue";
  unit?: string;
  detail?: string;
}) {
  const colors = {
    neutral: "text-mineral-50",
    good: "text-signal",
    warn: "text-solar",
    bad: "text-danger",
    blue: "text-blue"
  };
  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">{label}</div>
      <div className={clsx("mt-4 flex items-end gap-2 font-mono leading-none", colors[tone])}>
        <span className="text-4xl tracking-[-0.02em] md:text-5xl">{value}</span>
        {unit && <span className="pb-1 text-xs uppercase tracking-[0.16em] text-mineral-500">{unit}</span>}
      </div>
      {detail && <div className="mt-4 border-t border-line pt-3 font-mono text-[11px] text-mineral-500">{detail}</div>}
    </div>
  );
}
