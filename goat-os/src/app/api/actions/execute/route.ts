import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requestData } from "@/app/api/_utils";
import { approveRequest } from "@/lib/approvals/approve";

const Schema = z.object({ approvalId: z.string() });

export async function POST(request: Request) {
  const parsed = Schema.safeParse(await requestData(request));
  if (!parsed.success) return apiError("APPROVAL_REQUIRED", "Direct execution requires a valid approvalId.", 403, parsed.error.flatten());
  return NextResponse.json({ result: await approveRequest(parsed.data.approvalId) });
}
