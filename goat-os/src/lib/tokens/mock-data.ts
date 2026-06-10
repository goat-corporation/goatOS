import type { AgentProfile } from "@/types/agents";
import type { ActionLog, ApprovalRequest } from "@/types/actions";
import type { Bounty } from "@/types/bounties";
import type { Thesis } from "@/types/theses";
import type { TokenProfile } from "@/types/tokens";
import type { AgentPolicy, GovernanceMandate } from "@/lib/policy/types";

export const mockTokens: TokenProfile[] = [
  {
    mint: "Goat111111111111111111111111111111111111111",
    symbol: "GRAZE",
    name: "Graze Protocol",
    priceUsd: 0.00082,
    marketCapUsd: 820000,
    liquidityUsd: 146000,
    volume1hUsd: 42000,
    volume24hUsd: 385000,
    holders: 4310,
    top10HolderPercent: 19,
    devWalletStatus: "CLEAN",
    lpStatus: "LOCKED",
    migrationStatus: "MIGRATED",
    bundleRisk: 12,
    socialVelocity: 74,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
    links: { x: "https://x.com/graze", dexscreener: "https://dexscreener.com/solana/graze" }
  },
  {
    mint: "Nibble2222222222222222222222222222222222222",
    symbol: "NIB",
    name: "Nibble Finance",
    priceUsd: 0.00019,
    marketCapUsd: 210000,
    liquidityUsd: 41000,
    volume1hUsd: 81000,
    volume24hUsd: 510000,
    holders: 1120,
    top10HolderPercent: 47,
    devWalletStatus: "SUSPICIOUS",
    lpStatus: "LOW_LIQUIDITY",
    migrationStatus: "BONDING",
    bundleRisk: 68,
    socialVelocity: 93,
    createdAt: new Date(Date.now() - 1000 * 60 * 80),
    links: { telegram: "https://t.me/nibble", birdeye: "https://birdeye.so/token/nib" }
  },
  {
    mint: "Archive333333333333333333333333333333333333",
    symbol: "ARCH",
    name: "Archive Herd",
    priceUsd: 0.0021,
    marketCapUsd: 3200000,
    liquidityUsd: 610000,
    volume1hUsd: 39000,
    volume24hUsd: 290000,
    holders: 9230,
    top10HolderPercent: 22,
    devWalletStatus: "CLEAN",
    lpStatus: "MIGRATED",
    migrationStatus: "MIGRATED",
    bundleRisk: 18,
    socialVelocity: 41,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
    links: { website: "https://example.com/archive", dexscreener: "https://dexscreener.com/solana/archive" }
  }
];

export const mockAgents: AgentProfile[] = [
  {
    id: "scout-01",
    name: "Scout Agent",
    role: "Discovery",
    purpose: "Find new Solana memecoins and surface candidates for review.",
    status: "IDLE",
    walletAddress: "GoatScout111111111111111111111111111111111",
    currentMandate: "GRAZE",
    promptSummary: "Scans token feeds, tracks launch velocity, and creates watchlist theses.",
    riskPermissions: ["WATCHLIST", "NO_TRADE"],
    lastRunAt: new Date(Date.now() - 1000 * 60 * 8)
  },
  {
    id: "risk-01",
    name: "Risk Agent",
    role: "Risk scoring",
    purpose: "Score token risk and write non-promotional risk summaries.",
    status: "COMPLETED",
    walletAddress: "GoatRisk1111111111111111111111111111111111",
    currentMandate: "PURGE",
    promptSummary: "Analyzes concentration, liquidity, bundle risk, and dev wallet signals.",
    riskPermissions: ["WATCHLIST", "REJECT"],
    lastRunAt: new Date(Date.now() - 1000 * 60 * 18)
  },
  {
    id: "trader-01",
    name: "Trader Agent",
    role: "Proposal routing",
    purpose: "Create trade proposals and route approved actions through policy gates.",
    status: "IDLE",
    walletAddress: "GoatTrader11111111111111111111111111111111",
    currentMandate: "NIBBLE",
    promptSummary: "Creates bounded BUY/SELL proposals with invalidation criteria.",
    riskPermissions: ["BUY_PROPOSAL", "SELL_PROPOSAL", "SIMULATE_ONLY"],
    lastRunAt: new Date(Date.now() - 1000 * 60 * 31)
  },
  {
    id: "patron-01",
    name: "Patron Agent",
    role: "Bounty funding",
    purpose: "Create research, meme, dashboard, and security bounties.",
    status: "IDLE",
    walletAddress: "GoatPatron11111111111111111111111111111111",
    currentMandate: "PATRON",
    promptSummary: "Creates bounties and proposes payouts through approval gates.",
    riskPermissions: ["BOUNTY_CREATED", "PAY_BOUNTY"],
    lastRunAt: new Date(Date.now() - 1000 * 60 * 45)
  },
  {
    id: "historian-01",
    name: "Historian Agent",
    role: "Public memory",
    purpose: "Create public explanations, rejected-action notes, and postmortems.",
    status: "COMPLETED",
    walletAddress: "GoatHistorian11111111111111111111111111111",
    currentMandate: "ARCHIVE",
    promptSummary: "Summarizes why actions happened and resolves thesis outcomes.",
    riskPermissions: ["POSTMORTEM", "NO_FINANCIAL_ACTIONS"],
    lastRunAt: new Date(Date.now() - 1000 * 60 * 53)
  },
  {
    id: "governor-01",
    name: "Governor Agent",
    role: "Policy gate",
    purpose: "Validate whether proposed actions are allowed under current governance.",
    status: "IDLE",
    walletAddress: "GoatGovernor111111111111111111111111111111",
    currentMandate: "GRAZE",
    promptSummary: "Enforces emergency pause, approvals, limits, and mandate constraints.",
    riskPermissions: ["APPROVE", "REJECT", "MODIFY"]
  }
];

export const basePolicies: AgentPolicy[] = mockAgents.map((agent) => ({
  agentId: agent.id,
  maxTradeSizeSol: agent.id === "trader-01" ? 0.15 : 0,
  maxDailySpendSol: agent.id === "patron-01" ? 1.5 : agent.id === "trader-01" ? 0.5 : 0,
  maxOpenPositions: agent.id === "trader-01" ? 2 : 0,
  allowedActions:
    agent.id === "trader-01"
      ? ["BUY_TOKEN", "SELL_TOKEN", "SWAP"]
      : agent.id === "patron-01"
        ? ["PAY_BOUNTY", "SEND_PAYMENT"]
        : [],
  requireHumanApprovalAboveSol: 0,
  autonomousModeEnabled: false,
  dryRunOnly: true,
  allowedTokenMints: [],
  blockedTokenMints: ["Nibble2222222222222222222222222222222222222"],
  blockedWallets: [],
  minRiskScore: 0,
  maxRiskScore: agent.id === "trader-01" ? 40 : 100,
  cooldownMinutes: 30,
  emergencyPaused: false
}));

export const activeMandate: GovernanceMandate = {
  type: "GRAZE",
  active: true,
  settings: { dailySpendLimitSol: 0, autonomousModeEnabled: false, dryRunOnly: true }
};

export const mockTheses: Thesis[] = [
  {
    id: "thesis-graze-watch",
    agentId: "scout-01",
    tokenMint: mockTokens[0].mint,
    actionType: "WATCHLIST",
    confidence: 0.67,
    riskScore: 24,
    reasons: ["Liquidity is above the local watchlist threshold.", "Social velocity is rising without extreme holder concentration."],
    invalidations: ["Top holder concentration exceeds 35%.", "Liquidity falls below 50k USD."],
    sourceLinks: mockTokens[0].links.dexscreener ? [mockTokens[0].links.dexscreener] : [],
    status: "OPEN",
    createdAt: new Date(Date.now() - 1000 * 60 * 120)
  },
  {
    id: "thesis-nib-reject",
    agentId: "risk-01",
    tokenMint: mockTokens[1].mint,
    actionType: "REJECT",
    confidence: 0.82,
    riskScore: 79,
    reasons: ["Top holder concentration is elevated.", "Bundle risk and short-age volume mismatch are severe."],
    invalidations: ["Liquidity migrates and concentration disperses.", "Independent holder growth continues for 24 hours."],
    sourceLinks: [],
    status: "OPEN",
    createdAt: new Date(Date.now() - 1000 * 60 * 72)
  }
];

export const mockBounties: Bounty[] = [
  {
    id: "bounty-risk-brief",
    type: "RESEARCH",
    title: "Independent concentration review for GRAZE",
    description: "Produce a source-linked holder and liquidity review suitable for public logs.",
    rewardSol: 0.25,
    creatorId: "patron-01",
    status: "OPEN",
    submissionsCount: 2,
    payoutState: "NONE",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6)
  },
  {
    id: "bounty-dashboard-module",
    type: "DASHBOARD",
    title: "Compact risk timeline component",
    description: "Design a dense timeline panel that shows score deltas and policy rejections.",
    rewardSol: 0.4,
    creatorId: "patron-01",
    status: "REVIEWING",
    submissionsCount: 4,
    payoutState: "PROPOSED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18)
  }
];

export const mockApprovals: ApprovalRequest[] = [
  {
    id: "approval-buy-graze",
    actionId: "act-buy-graze",
    agentId: "trader-01",
    thesisId: "thesis-graze-buy",
    status: "PENDING",
    policyDecision: { allowed: true, reason: "Dry-run proposal requires human approval before execution.", requiredApproval: true },
    simulationResult: { actionId: "act-buy-graze", success: true, estimatedFeeSol: 0.0005, expectedOutput: "mock 182000 GRAZE", warnings: ["Dry-run mode enabled."] },
    action: { id: "act-buy-graze", agentId: "trader-01", type: "BUY_TOKEN", chain: "solana", tokenMint: mockTokens[0].mint, amountSol: 0.05 },
    createdAt: new Date(Date.now() - 1000 * 60 * 12)
  }
];

export const mockLogs: ActionLog[] = [
  { id: "log-1", type: "AGENT_STARTED", agentId: "scout-01", payload: { cycle: "watchlist" }, createdAt: new Date(Date.now() - 1000 * 60 * 130) },
  { id: "log-2", type: "AGENT_THESIS_CREATED", agentId: "scout-01", tokenMint: mockTokens[0].mint, thesisId: "thesis-graze-watch", payload: { actionType: "WATCHLIST" }, createdAt: new Date(Date.now() - 1000 * 60 * 120) },
  { id: "log-3", type: "RISK_SCORE_UPDATED", agentId: "risk-01", tokenMint: mockTokens[1].mint, payload: { score: 79 }, createdAt: new Date(Date.now() - 1000 * 60 * 72) },
  { id: "log-4", type: "POLICY_REJECTED_ACTION", agentId: "governor-01", tokenMint: mockTokens[1].mint, payload: { reason: "Blocked token and risk score outside mandate bounds." }, createdAt: new Date(Date.now() - 1000 * 60 * 61) },
  { id: "log-5", type: "APPROVAL_CREATED", agentId: "trader-01", tokenMint: mockTokens[0].mint, thesisId: "thesis-graze-buy", payload: { actionId: "act-buy-graze" }, createdAt: new Date(Date.now() - 1000 * 60 * 12) }
];
