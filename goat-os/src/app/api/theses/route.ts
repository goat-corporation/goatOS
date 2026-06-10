import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requestData } from "@/app/api/_utils";
import { createThesis, getAllTheses } from "@/lib/theses/create";

const CreateThesisSchema = z.object({
  agentId: z.string(),
  tokenMint: z.string().optional(),
  actionType: z.enum(["WATCHLIST", "REJECT", "BUY_PROPOSAL", "BUY_EXECUTED", "SELL_PROPOSAL", "SELL_EXECUTED", "BOUNTY_CREATED", "BOUNTY_PAID"]),
  confidence: z.coerce.number().min(0).max(1),
  riskScore: z.coerce.number().int().min(0).max(100).optional(),
  reasons: z.array(z.string()).optional(),
  invalidations: z.array(z.string()).optional()
});

export async function GET() {
  return NextResponse.json({ theses: await getAllTheses() });
}

export async function POST(request: Request) {
  const parsed = CreateThesisSchema.safeParse(await requestData(request));
  if (!parsed.success) return apiError("MALFORMED_PAYLOAD", "Invalid thesis payload.", 422, parsed.error.flatten());
  const thesis = await createThesis({ ...parsed.data, reasons: parsed.data.reasons ?? ["Manual thesis created."], invalidations: parsed.data.invalidations ?? ["Manual invalidation required."], sourceLinks: [] });
  return NextResponse.json({ thesis }, { status: 201 });
}
