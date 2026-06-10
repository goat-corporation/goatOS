export type AgentId = "scout-01" | "risk-01" | "trader-01" | "patron-01" | "historian-01" | "governor-01";

export type AgentProfile = {
  id: AgentId;
  name: string;
  role: string;
  purpose: string;
  status: "IDLE" | "RUNNING" | "COMPLETED" | "FAILED";
  walletAddress: string;
  currentMandate: string;
  promptSummary: string;
  riskPermissions: string[];
  lastRunAt?: Date;
};

export type AgentTask =
  | { type: "SCOUT_CYCLE" }
  | { type: "RISK_REVIEW"; tokenMint: string }
  | { type: "TRADER_DECISION"; tokenMint: string }
  | { type: "PATRON_CYCLE" }
  | { type: "HISTORIAN_POSTMORTEM"; thesisId: string }
  | { type: "GOVERNOR_CHECK" };

export type AgentRunResult = {
  agentId: string;
  success: boolean;
  createdThesisIds: string[];
  createdActionIds: string[];
  createdApprovalIds: string[];
  logs: string[];
  error?: string;
};
