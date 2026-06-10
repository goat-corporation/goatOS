import { createBounty } from "@/lib/bounties/create";

export async function runPatronAgent() {
  return createBounty({
    type: "RESEARCH",
    title: "Fresh launch risk packet",
    description: "Create a concise source-linked report on holder concentration, LP status, and social velocity mismatch for the current watchlist leader.",
    rewardSol: 0.18,
    creatorId: "patron-01"
  });
}
