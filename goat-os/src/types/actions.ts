import type { PolicyDecision } from "@/lib/policy/types";
import type { GoatAction, GoatSimulationResult } from "@/lib/goat/actions";

export type ActionLogType =
  | "AGENT_STARTED"
  | "AGENT_COMPLETED"
  | "AGENT_FAILED"
  | "AGENT_THESIS_CREATED"
  | "POLICY_APPROVED_ACTION"
  | "POLICY_REJECTED_ACTION"
  | "TRADE_SIMULATED"
  | "TRADE_EXECUTED"
  | "TRADE_FAILED"
  | "BOUNTY_CREATED"
  | "BOUNTY_SUBMITTED"
  | "BOUNTY_PAYOUT_PROPOSED"
  | "BOUNTY_PAID"
  | "RISK_SCORE_UPDATED"
  | "GOVERNANCE_UPDATED"
  | "APPROVAL_CREATED"
  | "APPROVAL_ACCEPTED"
  | "APPROVAL_REJECTED"
  | "EMERGENCY_PAUSE_ENABLED"
  | "EMERGENCY_PAUSE_DISABLED";

export type ActionLog = {
  id: string;
  type: ActionLogType;
  agentId?: string;
  tokenMint?: string;
  thesisId?: string;
  bountyId?: string;
  txHash?: string;
  payload: Record<string, unknown>;
  createdAt: Date;
};

export type ApprovalRequest = {
  id: string;
  actionId: string;
  agentId: string;
  thesisId?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";
  policyDecision: PolicyDecision;
  simulationResult?: GoatSimulationResult;
  action: GoatAction;
  createdAt: Date;
  resolvedAt?: Date;
};

export type ApiError = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};
