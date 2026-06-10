import { resolveThesis } from "@/lib/theses/resolve";

export async function runHistorianAgent(thesisId: string) {
  return resolveThesis(thesisId, "NEUTRAL", "Outcome recorded from mock market data. The thesis stayed within policy constraints and did not promise profit.");
}
