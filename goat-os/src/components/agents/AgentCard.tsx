import type { AgentProfile } from "@/types/agents";
import { AgentStatusBadge } from "@/components/agents/AgentStatusBadge";
import { WalletStatus } from "@/components/agents/WalletStatus";

export function AgentCard({ agent }: { agent: AgentProfile }) {
  return (
    <a href={`/agents/${agent.id}`} className="block rounded border border-line bg-panel p-4 hover:border-signal/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold">{agent.name}</div>
          <div className="text-sm text-zinc-400">{agent.role}</div>
        </div>
        <AgentStatusBadge status={agent.status} />
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-zinc-300">{agent.purpose}</p>
      <div className="mt-4 flex items-center justify-between text-xs">
        <WalletStatus address={agent.walletAddress} />
        <span className="rounded bg-field px-2 py-1 font-mono text-amber">{agent.currentMandate}</span>
      </div>
    </a>
  );
}
