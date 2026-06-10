import { NextResponse } from "next/server";
import { apiError } from "@/app/api/_utils";
import { getTokenByMint } from "@/lib/tokens/profile";

export async function GET(_: Request, { params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  const token = await getTokenByMint(mint);
  if (!token) return apiError("TOKEN_NOT_FOUND", "Token not found.", 404);
  return NextResponse.json({ token });
}
