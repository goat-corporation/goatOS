import { NextResponse } from "next/server";
import { requestData } from "@/app/api/_utils";
import { logEvent } from "@/lib/logs/logger";
import { store } from "@/lib/mock-store";

export async function POST(request: Request) {
  const data = await requestData(request).catch(() => ({}));
  if (data.mandate) {
    store.mandate.type = String(data.mandate) as typeof store.mandate.type;
    await logEvent({ type: "GOVERNANCE_UPDATED", agentId: "governor-01", payload: { mandate: store.mandate.type } });
    return NextResponse.json({ mandate: store.mandate });
  }
  const paused = String(data.paused ?? "true") === "true";
  for (const policy of store.policies) policy.emergencyPaused = paused;
  await logEvent({ type: paused ? "EMERGENCY_PAUSE_ENABLED" : "EMERGENCY_PAUSE_DISABLED", agentId: "governor-01", payload: { paused } });
  return NextResponse.json({ paused });
}
