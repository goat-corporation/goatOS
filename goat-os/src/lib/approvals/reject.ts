import { store } from "@/lib/mock-store";
import { logEvent } from "@/lib/logs/logger";

export async function rejectRequest(id: string, reason = "Rejected by user.") {
  const approval = store.approvals.find((item) => item.id === id);
  if (!approval) return undefined;
  if (approval.status !== "PENDING") throw new Error("Approval is not pending.");
  approval.status = "REJECTED";
  approval.resolvedAt = new Date();
  await logEvent({ type: "APPROVAL_REJECTED", agentId: approval.agentId, thesisId: approval.thesisId, payload: { approvalId: id, reason } });
  return approval;
}
