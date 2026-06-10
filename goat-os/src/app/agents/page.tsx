import { AgentCard } from "@/components/agents/AgentCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SectionHeader } from "@/components/ui/Surface";
import { getAgents } from "@/lib/agents/registry";

export default async function AgentsPage() {
  const agents = await getAgents();
  return <DashboardShell><SectionHeader eyebrow="agent mesh" title="Agents" meta="Specialized policy-bound subsystems with isolated responsibilities and public action trails." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div></DashboardShell>;
}
