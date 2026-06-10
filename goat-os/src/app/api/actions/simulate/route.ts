import { NextResponse } from "next/server";
import { apiError, requestData } from "@/app/api/_utils";
import { GoatActionSchema, simulateGoatAction } from "@/lib/goat/actions";

export async function POST(request: Request) {
  const parsed = GoatActionSchema.safeParse(await requestData(request));
  if (!parsed.success) return apiError("MALFORMED_PAYLOAD", "Invalid action.", 422, parsed.error.flatten());
  return NextResponse.json({ simulation: await simulateGoatAction(parsed.data) });
}
