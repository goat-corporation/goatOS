import type { ActionLog, ActionLogType } from "@/types/actions";
import { nextId, store } from "@/lib/mock-store";

export async function logEvent(input: {
  type: ActionLogType;
  agentId?: string;
  tokenMint?: string;
  thesisId?: string;
  bountyId?: string;
  txHash?: string;
  payload?: Record<string, unknown>;
}): Promise<ActionLog> {
  const log: ActionLog = {
    id: nextId("log"),
    type: input.type,
    agentId: input.agentId,
    tokenMint: input.tokenMint,
    thesisId: input.thesisId,
    bountyId: input.bountyId,
    txHash: input.txHash,
    payload: sanitizePayload(input.payload ?? {}),
    createdAt: new Date()
  };
  store.logs.unshift(log);
  return log;
}

export async function getActionLogs(): Promise<ActionLog[]> {
  return store.logs;
}

function sanitizePayload(payload: Record<string, unknown>) {
  const text = JSON.stringify(payload);
  if (/private|secret|keypair|seed/i.test(text)) {
    return { redacted: true, reason: "Sensitive-looking payload omitted from public log." };
  }
  return payload;
}
