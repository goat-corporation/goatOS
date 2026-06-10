import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requestData } from "@/app/api/_utils";
import { rejectRequest } from "@/lib/approvals/reject";

const Schema = z.object({ approvalId: z.string(), reason: z.string().optional() });

export async function POST(request: Request) {
  const parsed = Schema.safeParse(await requestData(request));
  if (!parsed.success) return apiError("MALFORMED_PAYLOAD", "approvalId is required.", 422, parsed.error.flatten());
  const result = await rejectRequest(parsed.data.approvalId, parsed.data.reason).catch((error) => ({ error: error instanceof Error ? error.message : "Rejection failed." }));
  return NextResponse.json({ result });
}
