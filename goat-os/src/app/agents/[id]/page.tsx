import { notFound } from "next/navigation";
import { PolicyPanel } from "@/components/governance/PolicyPanel";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ActionLogFeed } from "@/components/logs/ActionLogFeed";
import { ThesisCard } from "@/components/theses/ThesisCard";
import { SectionHeader, Surface } from "@/components/ui/Surface";
import { getAgent, getAgentPolicy } from "@/lib/agents/registry";
import { agentPrompts } from "@/lib/agents/prompts";
import { getActionLogs } from "@/lib/logs/logger";
import { getThesesForAgent } from "@/lib/theses/create";

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = await getAgent(id);
  if (!agent) notFound();
  const [policy, theses, logs] = await Promise.all([getAgentPolicy(id), getThesesForAgent(id), getActionLogs()]);
  return (
    <DashboardShell>
      <SectionHeader
        eyebrow="agent detail"
        title={agent.name}
        meta={agent.purpose}
        action={<form action={`/api/agents/${id}/run`} method="post"><button className="rounded-xl border border-signal/45 bg-signal/14 px-4 py-2 text-xs font-medium text-signal transition hover:bg-signal/20">Run agent</button></form>}
      />
      <div className="grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-4"><PolicyPanel policy={policy} /></div>
        <Surface className="xl:col-span-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">System Prompt Summary</div>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-mineral-300">{agentPrompts[id as keyof typeof agentPrompts] ?? agent.promptSummary}</p>
          <div className="mt-6 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Memory/context</div>
          <p className="mt-3 text-sm leading-6 text-mineral-300">Recent theses, policy decisions, mandate state, and public logs are loaded before runtime execution.</p>
        </Surface>
      </div>
      <div className="mt-8 grid gap-5 xl:grid-cols-12">
        <section className="xl:col-span-7"><SectionHeader eyebrow="agent research" title="Theses created" /><div className="grid gap-4 md:grid-cols-2">{theses.map((thesis) => <ThesisCard key={thesis.id} thesis={thesis} />)}</div></section>
        <aside className="xl:col-span-5"><ActionLogFeed logs={logs.filter((log) => log.agentId === id)} /></aside>
      </div>
    </DashboardShell>
  );
}
