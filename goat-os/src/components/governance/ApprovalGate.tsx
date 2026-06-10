import type { ApprovalRequest } from "@/types/actions";

export function ApprovalGate({ approvals }: { approvals: ApprovalRequest[] }) {
  return (
    <div className="rounded border border-line bg-panel">
      <div className="border-b border-line p-3 font-semibold">Pending Approvals</div>
      <div className="divide-y divide-line">
        {approvals.filter((a) => a.status === "PENDING").map((approval) => (
          <div key={approval.id} className="p-3 text-sm">
            <div className="font-mono text-amber">{approval.action.type} · {approval.action.amountSol ?? 0} SOL</div>
            <div className="mt-1 text-zinc-400">{approval.policyDecision.reason}</div>
            <div className="mt-3 flex gap-2">
              <form action="/api/actions/approve" method="post"><button className="rounded bg-signal px-3 py-1.5 text-xs font-semibold text-field" name="approvalId" value={approval.id}>Approve</button></form>
              <form action="/api/actions/reject" method="post"><button className="rounded border border-line px-3 py-1.5 text-xs text-zinc-300" name="approvalId" value={approval.id}>Reject</button></form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
