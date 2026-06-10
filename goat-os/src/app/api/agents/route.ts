import { NextResponse } from "next/server";
import { getAgents } from "@/lib/agents/registry";

export async function GET() {
  return NextResponse.json({ agents: await getAgents() });
}
