import { NextResponse } from "next/server";

export function apiError(code: string, message: string, status = 400, details?: Record<string, unknown>) {
  return NextResponse.json({ error: { code, message, details } }, { status });
}

export async function requestData(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) return request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}
