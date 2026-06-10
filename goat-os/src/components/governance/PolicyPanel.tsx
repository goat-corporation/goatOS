import type { AgentPolicy } from "@/lib/policy/types";

export function PolicyPanel({ policy }: { policy?: AgentPolicy }) {
  if (!policy) return <div className="rounded border border-line bg-panel p-4 text-sm text-danger">No policy configured.</div>;
  return (
    <div className="rounded border border-line bg-panel p-4">
      <div className="mb-3 font-semibold">Policy</div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <dt className="text-zinc-500">Max trade</dt><dd className="font-mono">{policy.maxTradeSizeSol} SOL</dd>
        <dt className="text-zinc-500">Daily spend</dt><dd className="font-mono">{policy.maxDailySpendSol} SOL</dd>
        <dt className="text-zinc-500">Risk range</dt><dd className="font-mono">{policy.minRiskScore}-{policy.maxRiskScore}</dd>
        <dt className="text-zinc-500">Dry run</dt><dd className="font-mono">{String(policy.dryRunOnly)}</dd>
        <dt className="text-zinc-500">Autonomous</dt><dd className="font-mono">{String(policy.autonomousModeEnabled)}</dd>
        <dt className="text-zinc-500">Actions</dt><dd className="font-mono">{policy.allowedActions.join(", ") || "none"}</dd>
      </dl>
    </div>
  );
}
