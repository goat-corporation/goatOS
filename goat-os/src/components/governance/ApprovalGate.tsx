import type { ApprovalRequest } from "@/types/actions";

export function ApprovalGate({ approvals }: { approvals: ApprovalRequest[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="border-b border-line bg-panel px-5 py-4"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Pending Approvals</div></div>
      <div className="divide-y divide-line">
        {approvals.filter((a) => a.status === "PENDING").map((approval) => (
          <div key={approval.id} className="p-5 text-sm">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-solar">{approval.action.type} · {approval.action.amountSol ?? 0} SOL</div>
            <div className="mt-2 leading-5 text-mineral-300">{approval.policyDecision.reason}</div>
            <div className="mt-3 flex gap-2">
              <form action="/api/actions/approve" method="post"><button className="rounded-xl border border-signal/45 bg-signal/14 px-3 py-2 text-xs font-medium text-signal transition hover:bg-signal/20" name="approvalId" value={approval.id}>Approve</button></form>
              <form action="/api/actions/reject" method="post"><button className="rounded-xl border border-line-strong bg-control px-3 py-2 text-xs text-mineral-100 transition hover:border-danger/45 hover:text-danger" name="approvalId" value={approval.id}>Reject</button></form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
