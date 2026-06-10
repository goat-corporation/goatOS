import type { Thesis } from "@/types/theses";
import { store } from "@/lib/mock-store";

export async function resolveThesis(id: string, outcome: NonNullable<Thesis["outcome"]>, postmortem?: string) {
  const thesis = store.theses.find((item) => item.id === id);
  if (!thesis) return undefined;
  thesis.status = "RESOLVED";
  thesis.outcome = outcome;
  thesis.postmortem = postmortem ?? thesis.postmortem ?? "Resolved by goatOS historian with public outcome notes.";
  thesis.resolvedAt = new Date();
  return thesis;
}
