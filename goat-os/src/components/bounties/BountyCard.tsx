import type { Bounty } from "@/types/bounties";

export function BountyCard({ bounty }: { bounty: Bounty }) {
  return <a href={`/bounties/${bounty.id}`} className="block rounded border border-line bg-panel p-4 hover:border-signal/60"><div className="flex justify-between gap-3"><div><div className="font-mono text-xs text-amber">{bounty.type}</div><div className="font-semibold">{bounty.title}</div></div><div className="font-mono text-signal">{bounty.rewardSol} SOL</div></div><p className="mt-3 text-sm text-zinc-400">{bounty.description}</p><div className="mt-3 text-xs text-zinc-500">{bounty.status} · {bounty.submissionsCount} submissions · payout {bounty.payoutState}</div></a>;
}
