import { NextResponse } from "next/server";
import { getActionLogs } from "@/lib/logs/logger";

export async function GET() {
  return NextResponse.json({ logs: await getActionLogs() });
}
