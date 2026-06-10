export function MetricCard({ label, value, tone = "neutral" }: { label: string; value: string | number; tone?: "neutral" | "good" | "warn" | "bad" }) {
  const colors = { neutral: "text-zinc-100", good: "text-signal", warn: "text-amber", bad: "text-danger" };
  return (
    <div className="rounded border border-line bg-panel p-3">
      <div className="text-xs uppercase tracking-wide text-zinc-500">{label}</div>
      <div className={`mt-1 font-mono text-xl ${colors[tone]}`}>{value}</div>
    </div>
  );
}
