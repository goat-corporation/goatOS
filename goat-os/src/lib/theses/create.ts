import type { Thesis } from "@/types/theses";
import { nextId, store } from "@/lib/mock-store";
import { logEvent } from "@/lib/logs/logger";

export async function createThesis(input: Omit<Thesis, "id" | "createdAt" | "status"> & { id?: string; status?: Thesis["status"] }): Promise<Thesis> {
  const duplicate = store.theses.find((thesis) => thesis.agentId === input.agentId && thesis.tokenMint === input.tokenMint && thesis.actionType === input.actionType && thesis.status === "OPEN");
  if (duplicate) return duplicate;
  const thesis: Thesis = {
    ...input,
    id: input.id ?? nextId("thesis"),
    status: input.status ?? "OPEN",
    createdAt: new Date()
  };
  store.theses.unshift(thesis);
  await logEvent({ type: "AGENT_THESIS_CREATED", agentId: thesis.agentId, tokenMint: thesis.tokenMint, thesisId: thesis.id, payload: { actionType: thesis.actionType } });
  return thesis;
}

export async function getThesisById(id: string) {
  return store.theses.find((thesis) => thesis.id === id);
}

export async function getOpenTheses() {
  return store.theses.filter((thesis) => thesis.status === "OPEN");
}

export async function getThesesForToken(tokenMint: string) {
  return store.theses.filter((thesis) => thesis.tokenMint === tokenMint);
}

export async function getThesesForAgent(agentId: string) {
  return store.theses.filter((thesis) => thesis.agentId === agentId);
}

export async function getAllTheses() {
  return store.theses;
}
