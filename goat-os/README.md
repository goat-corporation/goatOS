# goatOS

goatOS is a command center for AI agents that research Solana memecoins.

In simple terms: it lets a group of specialized agents find new tokens, score risk, write public theses, simulate actions, ask for approval, and route approved wallet actions through the GOAT SDK. The app is designed to be transparent and safe by default. It is not a guaranteed trading bot, a black-box signal service, or a chatbot with direct wallet access.

## What It Does

goatOS demonstrates a full agent operating loop:

1. Scout Agent finds a token.
2. Risk Agent scores the token.
3. Trader Agent creates a bounded buy or sell proposal.
4. Governor Agent checks policy.
5. The action is simulated.
6. A human approves or rejects it.
7. Approved actions go through the GOAT SDK wrapper.
8. The action is logged publicly.
9. Historian Agent writes the postmortem.

The default local app runs with mock data and mock adapters, so you can explore the full product without API keys or live wallet credentials.

## Safety Defaults

goatOS starts in safe mode:

- Dry-run mode is enabled.
- Autonomous mode is disabled.
- Human approval is required.
- Live trading is disabled by default.
- Mock adapters are used when keys are missing.
- Private keys are never exposed to the frontend or the LLM.
- LLM output can only create typed proposals.
- Every protected action must pass policy, simulation, approval, execution wrapper, and public logging.

## Tech Stack

- TypeScript
- Next.js App Router
- React
- Tailwind CSS
- Prisma
- PostgreSQL
- Solana web3.js
- GOAT SDK
- Zod
- Vitest
- Optional Redis/BullMQ-style queue abstraction

## Getting Started

From the repository root:

```bash
cd goat-os
npm install
cp .env.example .env
npm run dev
```

Open:

```text
http://localhost:3000
```

If port 3000 is already in use:

```bash
npm run dev -- -p 3004
```

## Environment Variables

Start with:

```bash
cp .env.example .env
```

Important defaults:

```env
MOCK_MODE="true"
DRY_RUN_ONLY="true"
AUTONOMOUS_MODE_ENABLED="false"
```

You can run the product locally without real API keys. Add keys only when you are ready to test live integrations.

## Database Setup

The UI and tests work with deterministic mock data. For Prisma/PostgreSQL:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

The default database URL in `.env.example` is:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/goatos"
```

## Common Commands

```bash
npm run dev
npm run build
npm test
npm run typecheck
npm run db:generate
npm run db:push
npm run db:seed
```

## Project Structure

```text
src/app            Next.js pages and API routes
src/components     Reusable UI modules
src/lib/agents     Agent prompts, schemas, and runtime
src/lib/goat       GOAT SDK wrapper and mock execution layer
src/lib/policy     Policy engine and governance mandates
src/lib/tokens     Token adapters, profiles, and risk scoring
src/lib/theses     Thesis registry helpers
src/lib/bounties   Bounty creation and payout flow
src/lib/approvals  Approval request lifecycle
src/lib/logs       Public action log
tests              Critical unit tests
prisma             Database schema and seed data
```

## Agents

- Scout Agent: discovers new Solana memecoins and creates watchlist theses.
- Risk Agent: scores concentration, liquidity, dev wallet, bundle, and social risks.
- Trader Agent: creates bounded trade proposals and routes them through policy.
- Patron Agent: creates bounties and proposes payouts.
- Historian Agent: writes explanations and postmortems.
- Governor Agent: enforces mandates, limits, approval rules, and emergency pause.

## GOAT SDK Integration

GOAT SDK is the canonical onchain action layer. goatOS wraps it behind a safer application flow:

```text
proposal -> policy -> simulation -> approval -> GOAT wrapper -> transaction log
```

When GOAT credentials are missing, the wrapper uses deterministic mock wallets, mock simulations, and fake transaction hashes so the full product loop still works locally.

## Contributing

Before opening a pull request:

```bash
npm run typecheck
npm test
npm run build
```

Contribution guidelines:

- Keep wallet actions behind the GOAT wrapper.
- Do not expose secrets to the frontend.
- Validate API payloads with Zod.
- Add tests for policy, risk, approval, or execution changes.
- Preserve mock fallback behavior for local development.
- Keep UI changes consistent with the dark telemetry command-interface design.
- Avoid hype language, profit claims, or unsafe autonomous trading defaults.

## Adding a New Agent

1. Add the agent profile and policy seed data.
2. Add or update the system prompt in `src/lib/agents/prompts.ts`.
3. Add a typed runtime function in `src/lib/agents/runtime.ts`.
4. Validate structured output with Zod.
5. Log meaningful actions.
6. Add tests for the new runtime path.

## Adding a New External Adapter

1. Create the adapter in `src/lib/tokens/adapters`.
2. Return mock data when keys are missing.
3. Never crash the dashboard if the live API fails.
4. Expose a health check for the settings page.
5. Add risk-score or runtime tests if behavior changes.

## Deployment Notes

For production, configure:

- PostgreSQL
- Server-only GOAT wallet credentials
- Solana RPC provider
- OpenAI-compatible LLM provider
- Optional Redis queue backend
- Authentication and authorization around protected API routes

Keep `DRY_RUN_ONLY=true` until governance explicitly approves live execution.

## Limitations

This repository is a production-quality scaffold, not a finished trading operation. Live exchange routing, durable user auth, production queue workers, expanded analytics, and real token data providers should be completed and reviewed before any live financial use.
