import { Prisma, PrismaClient } from "@prisma/client";
import { mockAgents, mockBounties, mockLogs, mockTheses, mockTokens, basePolicies, activeMandate } from "../src/lib/tokens/mock-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.actionLog.deleteMany();
  await prisma.approvalRequest.deleteMany();
  await prisma.thesis.deleteMany();
  await prisma.bountySubmission.deleteMany();
  await prisma.bounty.deleteMany();
  await prisma.agentPolicy.deleteMany();
  await prisma.agentWallet.deleteMany();
  await prisma.agentMemory.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.tokenProfile.deleteMany();
  await prisma.governanceMandate.deleteMany();

  for (const token of mockTokens) {
    await prisma.tokenProfile.create({ data: { ...token, links: token.links } });
  }

  for (const agent of mockAgents) {
    await prisma.agent.create({
      data: {
        id: agent.id,
        name: agent.name,
        role: agent.role,
        status: agent.status,
        currentMandate: agent.currentMandate,
        promptSummary: agent.promptSummary,
        riskPermissions: agent.riskPermissions,
        lastRunAt: agent.lastRunAt,
        wallet: { create: { address: agent.walletAddress, mock: true } }
      }
    });
  }

  for (const policy of basePolicies) {
    await prisma.agentPolicy.create({ data: policy });
  }

  for (const thesis of mockTheses) {
    await prisma.thesis.create({ data: thesis });
  }

  for (const bounty of mockBounties) {
    await prisma.bounty.create({ data: { id: bounty.id, type: bounty.type, title: bounty.title, description: bounty.description, rewardSol: bounty.rewardSol, creatorId: bounty.creatorId, status: bounty.status, winnerId: bounty.winnerId, payoutTx: bounty.payoutTx, createdAt: bounty.createdAt } });
  }

  for (const log of mockLogs) {
    await prisma.actionLog.create({ data: { ...log, payload: log.payload as Prisma.InputJsonValue } });
  }

  await prisma.governanceMandate.create({ data: { type: activeMandate.type, active: true, settings: activeMandate.settings as Prisma.InputJsonValue } });
}

main().finally(async () => prisma.$disconnect());
