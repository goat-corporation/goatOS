import { notFound } from "next/navigation";
import { BountySubmissionList } from "@/components/bounties/BountySubmissionList";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { getBountyById } from "@/lib/bounties/create";

export default async function BountyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bounty = await getBountyById(id);
  if (!bounty) notFound();
  return <DashboardShell><h1 className="text-2xl font-semibold">{bounty.title}</h1><p className="mt-2 text-zinc-400">{bounty.description}</p><div className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded border border-line bg-panel p-4"><div className="font-mono text-signal">{bounty.rewardSol} SOL</div><div className="mt-2 text-sm text-zinc-400">{bounty.status} · payout {bounty.payoutState}</div><div className="mt-2 text-sm text-zinc-400">winner {bounty.winnerId ?? "not awarded"} · tx {bounty.payoutTx ?? "none"}</div></div><BountySubmissionList count={bounty.submissionsCount} /><div className="rounded border border-line bg-panel p-4"><form action={`/api/bounties/${id}/submit`} method="post" className="grid gap-3"><textarea name="content" className="min-h-24 rounded border border-line bg-field p-2 text-sm" placeholder="Submission summary" /><button className="rounded border border-line px-3 py-2 text-sm">Submit entry</button></form><form action={`/api/bounties/${id}/payout`} method="post" className="mt-3"><button className="rounded bg-signal px-3 py-2 text-sm font-semibold text-field">Propose payout</button></form></div></div></DashboardShell>;
}
