import { NextResponse } from "next/server";
import { apiError } from "@/app/api/_utils";
import { getBountyById } from "@/lib/bounties/create";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bounty = await getBountyById(id);
  if (!bounty) return apiError("BOUNTY_NOT_FOUND", "Bounty not found.", 404);
  return NextResponse.json({ bounty });
}
