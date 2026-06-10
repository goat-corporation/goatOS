import { BountyCard } from "@/components/bounties/BountyCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { getBounties } from "@/lib/bounties/create";

export default async function BountiesPage() {
  const bounties = await getBounties();
  return <DashboardShell><div className="flex justify-between"><h1 className="text-2xl font-semibold">Bounty Board</h1><form action="/api/bounties" method="post"><button className="rounded bg-signal px-3 py-2 text-sm font-semibold text-field">Create bounty</button></form></div><div className="mt-5 grid gap-4 md:grid-cols-2">{bounties.map((bounty) => <BountyCard key={bounty.id} bounty={bounty} />)}</div></DashboardShell>;
}
