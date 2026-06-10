import { env } from "@/lib/env";

export async function createAgentWallet(agentId: string): Promise<{ agentId: string; address: string }> {
  return { agentId, address: deterministicWallet(agentId) };
}

export async function getAgentWallet(agentId: string): Promise<{ agentId: string; address: string }> {
  return createAgentWallet(agentId);
}

function deterministicWallet(agentId: string): string {
  const body = Buffer.from(agentId).toString("hex").padEnd(38, "1").slice(0, 38);
  return `${env.goatLiveEnabled ? "GoatLive" : "GoatMock"}${body}`;
}
