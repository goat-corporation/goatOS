import { NextResponse } from "next/server";
import { apiError } from "@/app/api/_utils";
import { getAgent } from "@/lib/agents/registry";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = await getAgent(id);
  if (!agent) return apiError("AGENT_NOT_FOUND", "Agent not found.", 404);
  return NextResponse.json({ agent });
}
