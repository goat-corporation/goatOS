export type ThesisActionType =
  | "WATCHLIST"
  | "REJECT"
  | "BUY_PROPOSAL"
  | "BUY_EXECUTED"
  | "SELL_PROPOSAL"
  | "SELL_EXECUTED"
  | "BOUNTY_CREATED"
  | "BOUNTY_PAID";

export type Thesis = {
  id: string;
  agentId: string;
  tokenMint?: string;
  actionType: ThesisActionType;
  confidence: number;
  riskScore?: number;
  positionSizeSol?: number;
  maxLossSol?: number;
  timeHorizonMinutes?: number;
  reasons: string[];
  invalidations: string[];
  sourceLinks: string[];
  status: "OPEN" | "APPROVED" | "REJECTED" | "EXECUTED" | "RESOLVED" | "EXPIRED";
  outcome?: "WIN" | "LOSS" | "NEUTRAL" | "AVOIDED_RUG" | "MISSED_OPPORTUNITY";
  postmortem?: string;
  createdAt: Date;
  resolvedAt?: Date;
};
