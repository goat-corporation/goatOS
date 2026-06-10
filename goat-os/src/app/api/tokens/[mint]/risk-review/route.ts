import { NextResponse } from "next/server";
import { runRiskReview } from "@/lib/agents/runtime";

export async function POST(_: Request, { params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  const result = await runRiskReview(mint);
  return NextResponse.json({ result });
}
