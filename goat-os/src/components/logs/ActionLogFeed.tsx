import type { ActionLog } from "@/types/actions";

export function ActionLogFeed({ logs }: { logs: ActionLog[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="border-b border-line bg-panel px-5 py-4"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Public Action Log</div></div>
      <div className="max-h-96 divide-y divide-line overflow-auto">
        {logs.map((log) => <div key={log.id} className="grid grid-cols-[auto_1fr] gap-3 p-4 text-sm transition hover:bg-elevated/50"><span className="mt-1 h-2 w-2 rounded-full bg-signal shadow-[0_0_16px_rgba(114,244,212,0.6)]" /><div><div className="font-mono text-[11px] uppercase tracking-[0.08em] text-signal">{log.type}</div><div className="mt-1 text-mineral-300">{log.agentId ?? "system"} {log.tokenMint ? `· ${log.tokenMint.slice(0, 10)}...` : ""}</div><div className="mt-1 font-mono text-[10px] text-mineral-700">{log.createdAt.toLocaleString()}</div></div></div>)}
      </div>
    </div>
  );
}
