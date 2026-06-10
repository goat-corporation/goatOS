import type { AgentRunResult, AgentTask } from "@/types/agents";
import type { GoatAction } from "@/lib/goat/actions";
import { createApprovalRequest } from "@/lib/approvals/create";
import { runGovernorAgent } from "@/lib/agents/governor";
import { runHistorianAgent } from "@/lib/agents/historian";
import { runPatronAgent } from "@/lib/agents/patron";
import { runRiskAgent } from "@/lib/agents/risk";
import { runScoutAgent } from "@/lib/agents/scout";
import { runTraderAgent } from "@/lib/agents/trader";
import { simulateGoatAction } from "@/lib/goat/actions";
import { logEvent } from "@/lib/logs/logger";
import { store } from "@/lib/mock-store";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";

export async function runAgent(agentId: string, task: AgentTask): Promise<AgentRunResult> {
  const agent = store.agents.find((item) => item.id === agentId);
  if (!agent) return failure(agentId, "Agent not found.");
  agent.status = "RUNNING";
  agent.lastRunAt = new Date();
  await logEvent({ type: "AGENT_STARTED", agentId, payload: { task } });
  try {
    if (task.type === "SCOUT_CYCLE") return await runScoutCycle();
    if (task.type === "RISK_REVIEW") return await runRiskReview(task.tokenMint);
    if (task.type === "TRADER_DECISION") return await runTraderDecision(task.tokenMint);
    if (task.type === "PATRON_CYCLE") return await runPatronCycle();
    if (task.type === "HISTORIAN_POSTMORTEM") return await runHistorianPostmortem(task.thesisId);
    return failure(agentId, "Unsupported task.");
  } catch (error) {
    agent.status = "FAILED";
    const message = error instanceof Error ? error.message : "Agent runtime failure.";
    await logEvent({ type: "AGENT_FAILED", agentId, payload: { message } });
    return failure(agentId, message);
  }
}

export async function runScoutCycle(): Promise<AgentRunResult> {
  const thesis = await runScoutAgent();
  return complete("scout-01", [thesis.id], [], [], ["Scout created watchlist thesis."]);
}

export async function runRiskReview(tokenMint: string): Promise<AgentRunResult> {
  const thesis = await runRiskAgent(tokenMint);
  await logEvent({ type: "RISK_SCORE_UPDATED", agentId: "risk-01", tokenMint, payload: { riskScore: thesis.riskScore } });
  return complete("risk-01", [thesis.id], [], [], ["Risk review completed."]);
}

export async function runTraderDecision(tokenMint: string): Promise<AgentRunResult> {
  const thesis = await runTraderAgent(tokenMint);
  const token = store.tokens.find((item) => item.mint === tokenMint);
  const risk = token ? scoreTokenRisk(token) : { score: thesis.riskScore ?? 100 };
  const action: GoatAction = {
    id: `act-${thesis.id}`,
    agentId: "trader-01",
    type: thesis.actionType === "SELL_PROPOSAL" ? "SELL_TOKEN" : "BUY_TOKEN",
    chain: "solana",
    tokenMint,
    amountSol: thesis.positionSizeSol,
    metadata: { thesisId: thesis.id, riskScore: risk.score }
  };
  const decision = await runGovernorCheck(action);
  if (!decision.allowed) return complete("trader-01", [thesis.id], [action.id], [], [`Policy rejected action: ${decision.reason}`]);
  const simulation = await simulateGoatAction(decision.modifiedAction ?? action);
  const approval = await createApprovalRequest({ action: decision.modifiedAction ?? action, policyDecision: decision, simulationResult: simulation, thesisId: thesis.id });
  thesis.status = "APPROVED";
  return complete("trader-01", [thesis.id], [action.id], [approval.id], ["Trader proposal simulated and approval created."]);
}

export async function runPatronCycle(): Promise<AgentRunResult> {
  const bounty = await runPatronAgent();
  return complete("patron-01", [], [], [], [`Bounty created: ${bounty.id}`]);
}

export async function runHistorianPostmortem(thesisId: string): Promise<AgentRunResult> {
  const thesis = await runHistorianAgent(thesisId);
  return complete("historian-01", thesis ? [thesis.id] : [], [], [], thesis ? ["Postmortem created."] : ["Thesis not found."]);
}

export async function runGovernorCheck(action: GoatAction) {
  return runGovernorAgent(action);
}

function complete(agentId: string, createdThesisIds: string[], createdActionIds: string[], createdApprovalIds: string[], logs: string[]): AgentRunResult {
  const agent = store.agents.find((item) => item.id === agentId);
  if (agent) agent.status = "COMPLETED";
  void logEvent({ type: "AGENT_COMPLETED", agentId, payload: { logs } });
  return { agentId, success: true, createdThesisIds, createdActionIds, createdApprovalIds, logs };
}

function failure(agentId: string, error: string): AgentRunResult {
  return { agentId, success: false, createdThesisIds: [], createdActionIds: [], createdApprovalIds: [], logs: [], error };
}
