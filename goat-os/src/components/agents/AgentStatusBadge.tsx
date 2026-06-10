export function AgentStatusBadge({ status }: { status: string }) {
  const color = status === "FAILED" ? "text-danger" : status === "RUNNING" ? "text-amber" : status === "COMPLETED" ? "text-signal" : "text-zinc-400";
  return <span className={`font-mono text-xs ${color}`}>{status}</span>;
}
