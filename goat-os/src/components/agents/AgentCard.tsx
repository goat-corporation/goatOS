import type { AgentProfile } from "@/types/agents";
import { AgentStatusBadge } from "@/components/agents/AgentStatusBadge";
import { WalletStatus } from "@/components/agents/WalletStatus";
import { PacketBar } from "@/components/ui/Surface";

export function AgentCard({ agent }: { agent: AgentProfile }) {
  const load = agent.status === "RUNNING" ? 82 : agent.status === "COMPLETED" ? 64 : agent.status === "FAILED" ? 18 : 37;
  return (
    <a href={`/agents/${agent.id}`} className="group block rounded-2xl border border-line bg-card p-5 transition duration-150 hover:border-signal/45 hover:bg-elevated/70">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mineral-500">{agent.role}</div>
          <div className="mt-2 text-lg font-medium text-mineral-50">{agent.name}</div>
        </div>
        <AgentStatusBadge status={agent.status} />
      </div>
      <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-mineral-300">{agent.purpose}</p>
      <div className="mt-5">
        <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-mineral-500"><span>permission load</span><span>{load}%</span></div>
        <PacketBar value={load} tone={agent.status === "FAILED" ? "red" : agent.status === "RUNNING" ? "solar" : "mint"} />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs">
        <WalletStatus address={agent.walletAddress} />
        <span className="rounded-md border border-line-strong bg-panel px-2 py-1 font-mono text-solar">{agent.currentMandate}</span>
      </div>
    </a>
  );
}
