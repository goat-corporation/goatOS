import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requestData } from "@/app/api/_utils";
import { resolveThesis } from "@/lib/theses/resolve";

const ResolveSchema = z.object({ outcome: z.enum(["WIN", "LOSS", "NEUTRAL", "AVOIDED_RUG", "MISSED_OPPORTUNITY"]).default("NEUTRAL"), postmortem: z.string().optional() });

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = ResolveSchema.safeParse(await requestData(request).catch(() => ({})));
  if (!parsed.success) return apiError("MALFORMED_PAYLOAD", "Invalid resolve payload.", 422, parsed.error.flatten());
  const thesis = await resolveThesis(id, parsed.data.outcome, parsed.data.postmortem);
  if (!thesis) return apiError("THESIS_NOT_FOUND", "Thesis not found.", 404);
  return NextResponse.json({ thesis });
}
