import { AgentCard } from "@/components/agents/AgentCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { getAgents } from "@/lib/agents/registry";

export default async function AgentsPage() {
  const agents = await getAgents();
  return <DashboardShell><h1 className="text-2xl font-semibold">Agents</h1><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div></DashboardShell>;
}
