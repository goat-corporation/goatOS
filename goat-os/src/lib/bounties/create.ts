import type { Bounty, BountyType } from "@/types/bounties";
import { nextId, store } from "@/lib/mock-store";
import { logEvent } from "@/lib/logs/logger";

export async function getBounties() {
  return store.bounties;
}

export async function getBountyById(id: string) {
  return store.bounties.find((bounty) => bounty.id === id);
}

export async function createBounty(input: { type: BountyType; title: string; description: string; rewardSol: number; creatorId: string }): Promise<Bounty> {
  const bounty: Bounty = { ...input, id: nextId("bounty"), status: "OPEN", submissionsCount: 0, payoutState: "NONE", createdAt: new Date() };
  store.bounties.unshift(bounty);
  await logEvent({ type: "BOUNTY_CREATED", agentId: input.creatorId, bountyId: bounty.id, payload: { rewardSol: input.rewardSol, type: input.type } });
  return bounty;
}

export async function submitBounty(id: string, content: string) {
  const bounty = await getBountyById(id);
  if (!bounty) return undefined;
  bounty.submissionsCount += 1;
  bounty.status = "SUBMITTED";
  await logEvent({ type: "BOUNTY_SUBMITTED", bountyId: id, payload: { content: sanitizeSubmission(content) } });
  return bounty;
}

function sanitizeSubmission(content: string) {
  return content.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").slice(0, 2000);
}
