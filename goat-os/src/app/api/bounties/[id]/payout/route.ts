import { NextResponse } from "next/server";
import { apiError } from "@/app/api/_utils";
import { proposeBountyPayout } from "@/lib/bounties/payout";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await proposeBountyPayout(id);
  if (!result) return apiError("BOUNTY_NOT_FOUND", "Bounty not found.", 404);
  return NextResponse.json({ result });
}
