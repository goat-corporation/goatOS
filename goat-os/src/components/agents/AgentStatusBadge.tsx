export function AgentStatusBadge({ status }: { status: string }) {
  const color = status === "FAILED" ? "border-danger/45 bg-danger/10 text-danger" : status === "RUNNING" ? "border-solar/45 bg-solar/10 text-solar" : status === "COMPLETED" ? "border-signal/45 bg-signal/10 text-signal" : "border-line-strong bg-control text-mineral-300";
  return <span className={`rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${color}`}>{status}</span>;
}
