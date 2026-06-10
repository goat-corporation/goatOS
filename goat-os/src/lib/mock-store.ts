import { mockAgents, mockApprovals, mockBounties, mockLogs, mockTheses, mockTokens, basePolicies, activeMandate } from "@/lib/tokens/mock-data";

export const store = {
  agents: [...mockAgents],
  tokens: [...mockTokens],
  theses: [...mockTheses],
  bounties: [...mockBounties],
  approvals: [...mockApprovals],
  logs: [...mockLogs],
  policies: [...basePolicies],
  mandate: { ...activeMandate }
};

export function nextId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
