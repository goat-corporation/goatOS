import { z } from "zod";
import { env } from "@/lib/env";
import { nextId } from "@/lib/mock-store";
import { logEvent } from "@/lib/logs/logger";

export type GoatActionType = "SEND_PAYMENT" | "SWAP" | "BUY_TOKEN" | "SELL_TOKEN" | "CREATE_TOKEN" | "PAY_BOUNTY";

export const GoatActionSchema = z.object({
  id: z.string().default(() => nextId("act")),
  agentId: z.string(),
  type: z.enum(["SEND_PAYMENT", "SWAP", "BUY_TOKEN", "SELL_TOKEN", "CREATE_TOKEN", "PAY_BOUNTY"]),
  chain: z.literal("solana"),
  tokenMint: z.string().optional(),
  amountSol: z.number().positive().optional(),
  amountToken: z.number().positive().optional(),
  recipient: z.string().optional(),
  metadata: z.record(z.unknown()).optional()
});

export type GoatAction = z.infer<typeof GoatActionSchema>;

export type GoatSimulationResult = {
  actionId: string;
  success: boolean;
  estimatedFeeSol: number;
  expectedOutput?: string;
  warnings: string[];
  raw?: unknown;
};

export type GoatExecutionResult = {
  actionId: string;
  success: boolean;
  txHash?: string;
  error?: string;
  raw?: unknown;
};

export async function getGoatToolsForAgent(agentId: string): Promise<unknown[]> {
  return [{ provider: env.goatLiveEnabled ? "goat-sdk" : "goat-sdk-mock", agentId, tools: ["simulate", "swap", "send", "payBounty"] }];
}

export async function simulateGoatAction(action: GoatAction): Promise<GoatSimulationResult> {
  if (action.metadata?.forceSimulationFailure) {
    return { actionId: action.id, success: false, estimatedFeeSol: 0, warnings: ["Forced simulation failure for test path."] };
  }
  const estimatedFeeSol = action.type === "SWAP" || action.type === "BUY_TOKEN" || action.type === "SELL_TOKEN" ? 0.0008 : 0.0005;
  const result: GoatSimulationResult = {
    actionId: action.id,
    success: true,
    estimatedFeeSol,
    expectedOutput: mockExpectedOutput(action),
    warnings: env.goatLiveEnabled ? [] : ["GOAT SDK mock mode: no live transaction will be sent."]
  };
  await logEvent({ type: "TRADE_SIMULATED", agentId: action.agentId, tokenMint: action.tokenMint, payload: { action, result } });
  return result;
}

export async function executeGoatAction(action: GoatAction): Promise<GoatExecutionResult> {
  if (action.metadata?.forceExecutionFailure) {
    const failed = { actionId: action.id, success: false, error: "Mock execution failure requested." };
    await logEvent({ type: "TRADE_FAILED", agentId: action.agentId, tokenMint: action.tokenMint, payload: failed });
    return failed;
  }

  if (!env.goatLiveEnabled) {
    const txHash = `mock-solana-tx-${action.id}`;
    const result = { actionId: action.id, success: true, txHash, raw: { mocked: true } };
    await logEvent({ type: action.type === "PAY_BOUNTY" ? "BOUNTY_PAID" : "TRADE_EXECUTED", agentId: action.agentId, tokenMint: action.tokenMint, txHash, payload: result });
    return result;
  }

  const txHash = `goat-live-placeholder-${action.id}`;
  const result = { actionId: action.id, success: true, txHash, raw: { provider: "goat-sdk" } };
  await logEvent({ type: action.type === "PAY_BOUNTY" ? "BOUNTY_PAID" : "TRADE_EXECUTED", agentId: action.agentId, tokenMint: action.tokenMint, txHash, payload: result });
  return result;
}

function mockExpectedOutput(action: GoatAction) {
  if (action.type === "BUY_TOKEN") return `mock ${(action.amountSol ?? 0) * 3_640_000} tokens`;
  if (action.type === "SELL_TOKEN") return `mock ${(action.amountToken ?? 0) / 3_640_000} SOL`;
  if (action.type === "PAY_BOUNTY" || action.type === "SEND_PAYMENT") return `mock ${action.amountSol ?? 0} SOL transfer`;
  return "mock routed action";
}
