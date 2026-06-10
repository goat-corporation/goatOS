import { AgentCard } from "@/components/agents/AgentCard";
import { ApprovalGate } from "@/components/governance/ApprovalGate";
import { EmergencyPauseButton } from "@/components/governance/EmergencyPauseButton";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ActionLogFeed } from "@/components/logs/ActionLogFeed";
import { ThesisCard } from "@/components/theses/ThesisCard";
import { TokenRiskCard } from "@/components/tokens/TokenRiskCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { SystemHero } from "@/components/system/SystemHero";
import { SectionHeader } from "@/components/ui/Surface";
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
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mineral-500">system state</div>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-mineral-50">Command Center</h1>
          <p className="mt-2 text-sm text-mineral-300">Dry-run by default · human approval required · mock adapters active when keys are missing</p>
        </div>
        <EmergencyPauseButton paused={paused} />
      </div>
      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8"><SystemHero agents={agents} tokens={tokens} theses={theses} mandate={store.mandate.type} /></div>
        <div className="grid gap-4 xl:col-span-4">
          <MetricCard label="Active mandate" value={store.mandate.type} tone="warn" detail="governance posture" />
          <MetricCard label="Pending approvals" value={store.approvals.filter((a) => a.status === "PENDING").length} tone="good" detail="human gate queue" />
          <ApprovalGate approvals={store.approvals} />
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Open theses" value={theses.filter((t) => t.status === "OPEN").length} unit="open" />
        <MetricCard label="Watched tokens" value={tokens.length} unit="feeds" tone="blue" />
        <MetricCard label="Agents online" value={agents.length} unit="nodes" />
        <MetricCard label="Public logs" value={logs.length} unit="events" tone="good" />
      </div>
      <div className="mt-8 grid gap-5 xl:grid-cols-12">
        <section className="xl:col-span-8">
          <SectionHeader eyebrow="agent mesh" title="Specialized operators" meta="Scout, risk, trader, patron, historian, and governor agents run as constrained subsystems." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div>
        </section>
        <aside className="xl:col-span-4"><ActionLogFeed logs={logs} /></aside>
      </div>
      <div className="mt-8 grid gap-5 xl:grid-cols-12">
        <section className="xl:col-span-5"><SectionHeader eyebrow="risk telemetry" title="Token watchlist" /><div className="grid gap-4">{tokens.map((token) => <TokenRiskCard key={token.mint} token={token} />)}</div></section>
        <section className="xl:col-span-7"><SectionHeader eyebrow="public research" title="Thesis feed" /><div className="grid gap-4 md:grid-cols-2">{theses.slice(0, 4).map((thesis) => <ThesisCard key={thesis.id} thesis={thesis} />)}</div></section>
      </div>
    </DashboardShell>
  );
}
