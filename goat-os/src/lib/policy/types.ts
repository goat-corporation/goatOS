import type { GoatAction, GoatActionType } from "@/lib/goat/actions";

export type GovernanceMandate = {
  type: "GRAZE" | "NIBBLE" | "STAMPEDE" | "PATRON" | "PURGE" | "ARCHIVE";
  active: boolean;
  settings: Record<string, unknown>;
};

export type AgentPolicy = {
  agentId: string;
  maxTradeSizeSol: number;
  maxDailySpendSol: number;
  maxOpenPositions: number;
  allowedActions: GoatActionType[];
  requireHumanApprovalAboveSol: number;
  autonomousModeEnabled: boolean;
  dryRunOnly: boolean;
  allowedTokenMints: string[];
  blockedTokenMints: string[];
  blockedWallets: string[];
  minRiskScore: number;
  maxRiskScore: number;
  cooldownMinutes: number;
  emergencyPaused: boolean;
};

export type PolicyContext = {
  riskScore?: number;
  dailySpendSol?: number;
  openPositions?: number;
  minutesSinceLastAction?: number;
  liveExecutionRequested?: boolean;
};

export type PolicyDecision = {
  allowed: boolean;
  reason: string;
  requiredApproval: boolean;
  modifiedAction?: GoatAction;
};
