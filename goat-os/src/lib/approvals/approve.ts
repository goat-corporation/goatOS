import { executeGoatAction } from "@/lib/goat/actions";
import { store } from "@/lib/mock-store";
import { logEvent } from "@/lib/logs/logger";

export async function approveRequest(id: string) {
  const approval = store.approvals.find((item) => item.id === id);
  if (!approval) return undefined;
  if (approval.status !== "PENDING") throw new Error("Approval is not pending.");
  approval.status = "APPROVED";
  approval.resolvedAt = new Date();
  await logEvent({ type: "APPROVAL_ACCEPTED", agentId: approval.agentId, thesisId: approval.thesisId, payload: { approvalId: id } });
  return executeGoatAction(approval.action);
}
