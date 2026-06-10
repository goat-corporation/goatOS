import type { ApprovalRequest } from "@/types/actions";
import type { GoatAction, GoatSimulationResult } from "@/lib/goat/actions";
import type { PolicyDecision } from "@/lib/policy/types";
import { nextId, store } from "@/lib/mock-store";
import { logEvent } from "@/lib/logs/logger";

export async function createApprovalRequest(input: { action: GoatAction; policyDecision: PolicyDecision; simulationResult?: GoatSimulationResult; thesisId?: string }): Promise<ApprovalRequest> {
  const existing = store.approvals.find((approval) => approval.actionId === input.action.id && approval.status === "PENDING");
  if (existing) return existing;
  const approval: ApprovalRequest = {
    id: nextId("approval"),
    actionId: input.action.id,
    agentId: input.action.agentId,
    thesisId: input.thesisId,
    status: "PENDING",
    policyDecision: input.policyDecision,
    simulationResult: input.simulationResult,
    action: input.action,
    createdAt: new Date()
  };
  store.approvals.unshift(approval);
  await logEvent({ type: "APPROVAL_CREATED", agentId: approval.agentId, thesisId: approval.thesisId, tokenMint: input.action.tokenMint, payload: { approvalId: approval.id, actionId: approval.actionId } });
  return approval;
}
