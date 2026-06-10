export type QueueJobType = "SCOUT_CYCLE" | "RISK_REVIEW" | "TRADER_DECISION" | "PATRON_CYCLE" | "HISTORIAN_POSTMORTEM" | "GOVERNOR_CHECK";

export type QueueJob = {
  type: QueueJobType;
  payload: Record<string, unknown>;
};
