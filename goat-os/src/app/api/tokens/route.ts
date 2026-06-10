import { NextResponse } from "next/server";
import { getTokens } from "@/lib/tokens/profile";

export async function GET() {
  return NextResponse.json({ tokens: await getTokens() });
}
