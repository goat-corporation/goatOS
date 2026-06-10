import { BountyCard } from "@/components/bounties/BountyCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SectionHeader } from "@/components/ui/Surface";
import { getBounties } from "@/lib/bounties/create";

export default async function BountiesPage() {
  const bounties = await getBounties();
  return <DashboardShell><SectionHeader eyebrow="patron rail" title="Bounty Board" meta="Research, dashboard, and security work routed through approval-gated payout flows." action={<form action="/api/bounties" method="post"><button className="rounded-xl border border-signal/45 bg-signal/14 px-3 py-2 text-xs font-medium text-signal transition hover:bg-signal/20">Create bounty</button></form>} /><div className="grid gap-4 md:grid-cols-2">{bounties.map((bounty) => <BountyCard key={bounty.id} bounty={bounty} />)}</div></DashboardShell>;
}
