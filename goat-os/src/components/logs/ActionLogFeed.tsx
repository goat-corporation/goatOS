import type { ActionLog } from "@/types/actions";

export function ActionLogFeed({ logs }: { logs: ActionLog[] }) {
  return (
    <div className="rounded border border-line bg-panel">
      <div className="border-b border-line p-3 font-semibold">Public Action Log</div>
      <div className="max-h-96 divide-y divide-line overflow-auto">
        {logs.map((log) => <div key={log.id} className="p-3 text-sm"><div className="font-mono text-xs text-signal">{log.type}</div><div className="mt-1 text-zinc-300">{log.agentId ?? "system"} {log.tokenMint ? `· ${log.tokenMint.slice(0, 10)}...` : ""}</div><div className="mt-1 font-mono text-xs text-zinc-600">{log.createdAt.toLocaleString()}</div></div>)}
      </div>
    </div>
  );
}
