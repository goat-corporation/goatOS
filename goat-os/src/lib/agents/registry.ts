import { store } from "@/lib/mock-store";

export async function getAgents() {
  return store.agents;
}

export async function getAgent(id: string) {
  return store.agents.find((agent) => agent.id === id);
}

export async function getAgentPolicy(agentId: string) {
  return store.policies.find((policy) => policy.agentId === agentId);
}
