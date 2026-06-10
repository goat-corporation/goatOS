import { z } from "zod";

export const TradeProposalSchema = z.object({
  tokenMint: z.string(),
  actionType: z.enum(["BUY_PROPOSAL", "SELL_PROPOSAL"]),
  confidence: z.number().min(0).max(1),
  riskScore: z.number().min(0).max(100),
  positionSizeSol: z.number().positive(),
  maxLossSol: z.number().nonnegative(),
  timeHorizonMinutes: z.number().int().positive(),
  reasons: z.array(z.string()).min(1),
  invalidations: z.array(z.string()).min(1),
  sourceLinks: z.array(z.string()).default([])
});

export const AgentRunInputSchema = z.object({
  task: z.object({
    type: z.enum(["SCOUT_CYCLE", "RISK_REVIEW", "TRADER_DECISION", "PATRON_CYCLE", "HISTORIAN_POSTMORTEM", "GOVERNOR_CHECK"]),
    tokenMint: z.string().optional(),
    thesisId: z.string().optional()
  })
});
