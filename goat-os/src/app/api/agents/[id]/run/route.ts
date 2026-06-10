import { NextResponse } from "next/server";
import { apiError, requestData } from "@/app/api/_utils";
import { runAgent } from "@/lib/agents/runtime";

const lastRun = new Map<string, number>();

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const now = Date.now();
  if (now - (lastRun.get(id) ?? 0) < 3000) return apiError("RATE_LIMITED", "Agent run rate limit is active.", 429);
  lastRun.set(id, now);
  const data = await requestData(request).catch(() => ({}));
  const task =
    id === "scout-01" ? { type: "SCOUT_CYCLE" as const } :
    id === "risk-01" ? { type: "RISK_REVIEW" as const, tokenMint: String(data.tokenMint ?? "Goat111111111111111111111111111111111111111") } :
    id === "trader-01" ? { type: "TRADER_DECISION" as const, tokenMint: String(data.tokenMint ?? "Goat111111111111111111111111111111111111111") } :
    id === "patron-01" ? { type: "PATRON_CYCLE" as const } :
    id === "historian-01" ? { type: "HISTORIAN_POSTMORTEM" as const, thesisId: String(data.thesisId ?? "thesis-graze-watch") } :
    { type: "GOVERNOR_CHECK" as const };
  const result = await runAgent(id, task);
  return NextResponse.json({ result });
}
