import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requestData } from "@/app/api/_utils";
import { createBounty, getBounties } from "@/lib/bounties/create";

const BountySchema = z.object({ type: z.enum(["RESEARCH", "MEME", "RAID", "DASHBOARD", "DEV", "SECURITY", "THREAD", "VIDEO"]).default("RESEARCH"), title: z.string().default("Operator research bounty"), description: z.string().default("Produce a concise public research packet."), rewardSol: z.coerce.number().positive().default(0.12), creatorId: z.string().default("patron-01") });

export async function GET() {
  return NextResponse.json({ bounties: await getBounties() });
}

export async function POST(request: Request) {
  const parsed = BountySchema.safeParse(await requestData(request).catch(() => ({})));
  if (!parsed.success) return apiError("MALFORMED_PAYLOAD", "Invalid bounty payload.", 422, parsed.error.flatten());
  return NextResponse.json({ bounty: await createBounty(parsed.data) }, { status: 201 });
}
