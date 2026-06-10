import { notFound } from "next/navigation";
import { BountySubmissionList } from "@/components/bounties/BountySubmissionList";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SectionHeader, Surface } from "@/components/ui/Surface";
import { getBountyById } from "@/lib/bounties/create";

export default async function BountyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bounty = await getBountyById(id);
  if (!bounty) notFound();
  return <DashboardShell><SectionHeader eyebrow="bounty detail" title={bounty.title} meta={bounty.description} /><div className="grid gap-5 xl:grid-cols-12"><Surface pale className="xl:col-span-4"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5F6A61]">Reward</div><div className="mt-4 font-mono text-5xl leading-none text-ink">{bounty.rewardSol}</div><div className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-[#5F6A61]">SOL</div><div className="mt-6 text-sm text-[#5F6A61]">{bounty.status} · payout {bounty.payoutState}</div><div className="mt-2 text-sm text-[#5F6A61]">winner {bounty.winnerId ?? "not awarded"} · tx {bounty.payoutTx ?? "none"}</div></Surface><div className="xl:col-span-3"><BountySubmissionList count={bounty.submissionsCount} /></div><Surface className="xl:col-span-5"><form action={`/api/bounties/${id}/submit`} method="post" className="grid gap-3"><textarea name="content" className="min-h-28 rounded-xl border border-line-strong bg-field p-3 text-sm text-mineral-100 placeholder:text-mineral-700" placeholder="Submission summary" /><button className="rounded-xl border border-line-strong bg-control px-3 py-2 text-sm text-mineral-100 transition hover:border-signal/45">Submit entry</button></form><form action={`/api/bounties/${id}/payout`} method="post" className="mt-3"><button className="rounded-xl border border-signal/45 bg-signal/14 px-3 py-2 text-sm font-medium text-signal transition hover:bg-signal/20">Propose payout</button></form></Surface></div></DashboardShell>;
}
