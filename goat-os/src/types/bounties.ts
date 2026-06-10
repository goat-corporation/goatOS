export type BountyType = "RESEARCH" | "MEME" | "RAID" | "DASHBOARD" | "DEV" | "SECURITY" | "THREAD" | "VIDEO";
export type BountyStatus = "OPEN" | "SUBMITTED" | "REVIEWING" | "AWARDED" | "PAID" | "CANCELLED";

export type Bounty = {
  id: string;
  type: BountyType;
  title: string;
  description: string;
  rewardSol: number;
  creatorId: string;
  status: BountyStatus;
  submissionsCount: number;
  payoutState: "NONE" | "PROPOSED" | "APPROVED" | "PAID";
  winnerId?: string;
  payoutTx?: string;
  createdAt: Date;
};
