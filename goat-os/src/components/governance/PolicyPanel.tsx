import type { AgentPolicy } from "@/lib/policy/types";

export function PolicyPanel({ policy }: { policy?: AgentPolicy }) {
  if (!policy) return <div className="rounded-2xl border border-line bg-card p-5 text-sm text-danger">No policy configured.</div>;
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <div className="mb-4 flex items-center justify-between"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Policy</div><span className="font-mono text-[10px] text-signal">{policy.agentId}</span></div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <dt className="text-mineral-500">Max trade</dt><dd className="font-mono text-mineral-100">{policy.maxTradeSizeSol} SOL</dd>
        <dt className="text-mineral-500">Daily spend</dt><dd className="font-mono text-mineral-100">{policy.maxDailySpendSol} SOL</dd>
        <dt className="text-mineral-500">Risk range</dt><dd className="font-mono text-mineral-100">{policy.minRiskScore}-{policy.maxRiskScore}</dd>
        <dt className="text-mineral-500">Dry run</dt><dd className="font-mono text-signal">{String(policy.dryRunOnly)}</dd>
        <dt className="text-mineral-500">Autonomous</dt><dd className="font-mono text-mineral-100">{String(policy.autonomousModeEnabled)}</dd>
        <dt className="text-mineral-500">Actions</dt><dd className="font-mono text-mineral-100">{policy.allowedActions.join(", ") || "none"}</dd>
      </dl>
    </div>
  );
}
