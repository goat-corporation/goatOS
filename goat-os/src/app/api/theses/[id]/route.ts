import { NextResponse } from "next/server";
import { apiError } from "@/app/api/_utils";
import { getThesisById } from "@/lib/theses/create";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thesis = await getThesisById(id);
  if (!thesis) return apiError("THESIS_NOT_FOUND", "Thesis not found.", 404);
  return NextResponse.json({ thesis });
}
