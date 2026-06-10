# goatOS

goatOS is a transparent AI-agent operating system for Solana memecoin markets. It acts as a public AI research treasury: agents discover tokens, score risk, create theses, simulate actions, request approval, route approved wallet actions through a GOAT SDK wrapper, publish logs, and write postmortems.

Default runtime is safe: mock mode enabled, dry-run enabled, autonomous mode disabled, human approval required, and emergency pause available.

## Core Loop

Scout Agent finds a token -> Risk Agent scores the token -> Trader Agent creates a BUY_PROPOSAL thesis -> Governor Agent checks policy -> action is simulated -> user approves or rejects -> approved action routes through GOAT execution wrapper -> action is logged publicly -> Historian Agent writes postmortem -> thesis outcome becomes visible.

## Architecture

```text
┌──────────────────────────────────────────────┐
│                  goatOS UI                    │
│ Dashboard · Agents · Tokens · Theses · Bounty │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│                 API Layer                     │
│ Next.js Route Handlers · Zod Validation       │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│              Agent Runtime                    │
│ Scout · Risk · Trader · Patron · Historian    │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│              Governor / Policy Engine         │
│ Mandates · Limits · Approval · Emergency Stop │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│              GOAT SDK Wrapper                 │
│ Wallet Tools · Payments · Swaps · Simulation  │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│                  Solana                       │
│ Wallets · Tokens · Transactions               │
└──────────────────────────────────────────────┘
```

## Setup

```bash
cd goat-os
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Open `http://localhost:3000/dashboard`.

## Environment

`.env.example` contains all required variables:

```text
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/goatos"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-4.1-mini"
SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
SOLANA_CLUSTER="mainnet-beta"
GOAT_SDK_API_KEY=""
GOAT_WALLET_SECRET=""
HELIUS_API_KEY=""
BIRDEYE_API_KEY=""
DEXSCREENER_API_KEY=""
JUPITER_API_KEY=""
REDIS_URL=""
MOCK_MODE="true"
DRY_RUN_ONLY="true"
AUTONOMOUS_MODE_ENABLED="false"
```

Missing API keys do not crash the app. Token adapters, LLM output, GOAT wallets, simulations, and executions fall back to deterministic mock behavior.

## Database

PostgreSQL is the production datastore. The scaffold also runs from in-memory mock registries for local UI and tests.

```bash
npm run db:push
npm run db:seed
```

Prisma models cover users, agents, wallets, policies, token profiles, theses, bounties, submissions, logs, approvals, mandates, memory, simulations, and executed transactions.

## GOAT SDK Integration

GOAT SDK is wrapped in `src/lib/goat/*`.

The required wallet action path is:

```text
LLM proposal -> policy validation -> simulation -> approval/autonomous gate -> GOAT SDK execution wrapper -> transaction persistence -> public action log
```

The frontend never receives private keys. Agents never receive private keys. LLM output can only create structured proposals.

## Safety Model

Financial actions are constrained by max trade size, daily spend limit, approval thresholds, dry-run mode, autonomous mode, risk bounds, token/wallet blocklists, cooldowns, open-position limits, and emergency pause.

Every operational failure returns a typed error and relevant policy/action failures are logged.

## Agents

- `scout-01`: discovers new launches and creates WATCHLIST theses.
- `risk-01`: scores risk and creates WATCHLIST or REJECT theses.
- `trader-01`: creates BUY/SELL proposals and routes through policy/simulation/approval.
- `patron-01`: creates bounties and proposes payout actions.
- `historian-01`: writes public explanations and postmortems.
- `governor-01`: enforces mandates, approvals, limits, and emergency pause.

## API Routes

- `GET /api/agents`
- `GET /api/agents/[id]`
- `POST /api/agents/[id]/run`
- `GET /api/tokens`
- `GET /api/tokens/[mint]`
- `POST /api/tokens/[mint]/risk-review`
- `GET /api/theses`
- `POST /api/theses`
- `GET /api/theses/[id]`
- `POST /api/theses/[id]/resolve`
- `GET /api/bounties`
- `POST /api/bounties`
- `GET /api/bounties/[id]`
- `POST /api/bounties/[id]/submit`
- `POST /api/bounties/[id]/payout`
- `GET /api/logs`
- `POST /api/actions/simulate`
- `POST /api/actions/approve`
- `POST /api/actions/reject`
- `POST /api/actions/execute`
- `POST /api/emergency-pause`

## Sequence Diagrams

### Trade Proposal Flow

```text
User
 │
 │ clicks "Run Trader"
 ▼
API Route
 │
 ▼
Trader Agent
 │ creates BUY_PROPOSAL
 ▼
Thesis Registry
 │
 ▼
Governor Agent
 │ checks policy
 ▼
Policy Engine
 │
 ├── rejected -> Action Log
 │
 └── allowed
       │
       ▼
   GOAT Simulation
       │
       ▼
   Approval Request
       │
       ▼
   User Approval
       │
       ▼
   GOAT Execution Wrapper
       │
       ▼
   Transaction Log
       │
       ▼
   Historian Postmortem
```

### Bounty Payout Flow

```text
Patron Agent
 │
 │ creates bounty
 ▼
Bounty Registry
 │
 ▼
User Submission
 │
 ▼
Award Decision
 │
 ▼
Payout Proposal
 │
 ▼
Policy Engine
 │
 ▼
GOAT Simulation
 │
 ▼
Approval Gate
 │
 ▼
GOAT Payment Execution
 │
 ▼
Action Log
```

## Tests

```bash
npm test
npm run typecheck
```

Coverage targets the policy engine, risk scoring, thesis registry, GOAT mock actions, and agent runtime.

## Deployment Notes

Use managed Postgres, server-only secrets for GOAT wallet configuration, a Solana RPC provider, and optional Redis for queues. Keep `DRY_RUN_ONLY=true` until governance explicitly approves live execution. The direct execution API requires an approval ID and should remain protected behind authentication in production.

## Limitations

The scaffold uses deterministic mock adapters by default. Live GOAT SDK execution, live Dexscreener/Birdeye/Helius/Jupiter integrations, auth, durable in-process state replacement, and production queue workers are integration milestones, not blockers for local operation.

## Implementation Milestones

1. Project foundation: Next.js, Tailwind, Prisma, env validation, layout, seed data, mock mode.
2. Domain models: agents, policies, tokens, theses, bounties, logs, approvals.
3. Policy + GOAT wrapper: simulation, mock execution, mandates, rejection logs.
4. Agent runtime: Scout, Risk, Trader, Patron, Historian, Governor.
5. UI completion: dashboard, agents, tokens, theses, bounties, governance, settings.
6. Tests + hardening: unit tests, API validation, action logging, README.
