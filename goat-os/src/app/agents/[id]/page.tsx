import { notFound } from "next/navigation";
import { PolicyPanel } from "@/components/governance/PolicyPanel";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ActionLogFeed } from "@/components/logs/ActionLogFeed";
import { ThesisCard } from "@/components/theses/ThesisCard";
import { getAgent, getAgentPolicy } from "@/lib/agents/registry";
import { agentPrompts } from "@/lib/agents/prompts";
import { getActionLogs } from "@/lib/logs/logger";
import { getThesesForAgent } from "@/lib/theses/create";

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = await getAgent(id);
  if (!agent) notFound();
  const [policy, theses, logs] = await Promise.all([getAgentPolicy(id), getThesesForAgent(id), getActionLogs()]);
  return <DashboardShell><div className="flex items-start justify-between gap-4"><div><h1 className="text-2xl font-semibold">{agent.name}</h1><p className="mt-2 text-zinc-400">{agent.purpose}</p></div><form action={`/api/agents/${id}/run`} method="post"><button className="rounded bg-signal px-4 py-2 font-semibold text-field">Run agent</button></form></div><div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><PolicyPanel policy={policy} /><div className="rounded border border-line bg-panel p-4"><div className="font-semibold">System Prompt Summary</div><p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{agentPrompts[id as keyof typeof agentPrompts] ?? agent.promptSummary}</p><div className="mt-4 font-semibold">Memory/context</div><p className="mt-2 text-sm text-zinc-400">Recent theses, policy decisions, mandate state, and public logs are loaded before runtime execution.</p></div></div><div className="mt-6 grid gap-4 md:grid-cols-2">{theses.map((thesis) => <ThesisCard key={thesis.id} thesis={thesis} />)}</div><div className="mt-6"><ActionLogFeed logs={logs.filter((log) => log.agentId === id)} /></div></DashboardShell>;
}
