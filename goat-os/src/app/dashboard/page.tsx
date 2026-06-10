import { AgentCard } from "@/components/agents/AgentCard";
import { ApprovalGate } from "@/components/governance/ApprovalGate";
import { EmergencyPauseButton } from "@/components/governance/EmergencyPauseButton";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ActionLogFeed } from "@/components/logs/ActionLogFeed";
import { ThesisCard } from "@/components/theses/ThesisCard";
import { TokenRiskCard } from "@/components/tokens/TokenRiskCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { getAgents } from "@/lib/agents/registry";
import { getActionLogs } from "@/lib/logs/logger";
import { store } from "@/lib/mock-store";
import { getAllTheses } from "@/lib/theses/create";
import { getTokens } from "@/lib/tokens/profile";

export default async function DashboardPage() {
  const [agents, tokens, theses, logs] = await Promise.all([getAgents(), getTokens(), getAllTheses(), getActionLogs()]);
  const paused = store.policies.some((policy) => policy.emergencyPaused);
  return (
    <DashboardShell>
      <div className="mb-5 flex items-center justify-between gap-4"><div><h1 className="text-2xl font-semibold">Command Center</h1><p className="text-sm text-zinc-400">Dry-run by default · human approval required · mock adapters active when keys are missing</p></div><EmergencyPauseButton paused={paused} /></div>
      <div className="grid gap-3 md:grid-cols-4"><MetricCard label="Active mandate" value={store.mandate.type} tone="warn" /><MetricCard label="Pending approvals" value={store.approvals.filter((a) => a.status === "PENDING").length} /><MetricCard label="Open theses" value={theses.filter((t) => t.status === "OPEN").length} /><MetricCard label="Watched tokens" value={tokens.length} /></div>
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4"><div className="grid gap-4 md:grid-cols-3">{agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div><div className="grid gap-4 md:grid-cols-3">{tokens.map((token) => <TokenRiskCard key={token.mint} token={token} />)}</div></div>
        <div className="grid gap-4"><ApprovalGate approvals={store.approvals} /><ActionLogFeed logs={logs} /></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">{theses.slice(0, 4).map((thesis) => <ThesisCard key={thesis.id} thesis={thesis} />)}</div>
    </DashboardShell>
  );
}
