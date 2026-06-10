import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requestData } from "@/app/api/_utils";
import { submitBounty } from "@/lib/bounties/create";

const SubmitSchema = z.object({ content: z.string().min(1).max(2000) });

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = SubmitSchema.safeParse(await requestData(request));
  if (!parsed.success) return apiError("MALFORMED_PAYLOAD", "Invalid submission.", 422, parsed.error.flatten());
  const bounty = await submitBounty(id, parsed.data.content);
  if (!bounty) return apiError("BOUNTY_NOT_FOUND", "Bounty not found.", 404);
  return NextResponse.json({ bounty });
}
