import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requestData } from "@/app/api/_utils";
import { approveRequest } from "@/lib/approvals/approve";

const Schema = z.object({ approvalId: z.string() });

export async function POST(request: Request) {
  const parsed = Schema.safeParse(await requestData(request));
  if (!parsed.success) return apiError("MALFORMED_PAYLOAD", "approvalId is required.", 422, parsed.error.flatten());
  const result = await approveRequest(parsed.data.approvalId).catch((error) => ({ error: error instanceof Error ? error.message : "Approval failed." }));
  return NextResponse.json({ result });
}
