import type { Bounty } from "@/types/bounties";

export function BountyCard({ bounty }: { bounty: Bounty }) {
  return <a href={`/bounties/${bounty.id}`} className="block rounded-2xl border border-line bg-card p-5 transition hover:border-signal/45 hover:bg-elevated/70"><div className="flex justify-between gap-3"><div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-solar">{bounty.type}</div><div className="mt-2 text-lg font-medium text-mineral-50">{bounty.title}</div></div><div className="font-mono text-lg text-signal">{bounty.rewardSol} SOL</div></div><p className="mt-4 text-sm leading-5 text-mineral-300">{bounty.description}</p><div className="mt-5 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-mineral-500">{bounty.status} · {bounty.submissionsCount} submissions · payout {bounty.payoutState}</div></a>;
}
