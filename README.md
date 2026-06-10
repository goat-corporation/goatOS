# goatOS

![goatOS banner](./banner-v2.png)

goatOS is an AI-agent command center for Solana memecoin research.

It helps agents discover tokens, score risk, write public theses, simulate wallet actions, request approval, and route approved actions through GOAT SDK. The default setup is safe: mock data, dry-run mode, human approval, and no live trading.

## Quick Start

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

If port 3000 is busy:

```bash
npm run dev -- -p 3004
```

## What You Can Do

- Watch Scout, Risk, Trader, Patron, Historian, and Governor agents.
- Review token intelligence and risk scores.
- Read public theses with rationale and invalidation criteria.
- Simulate trade or payout actions before approval.
- Approve or reject protected actions.
- Track every meaningful event in a public action log.

## Example Token Review

This is the kind of token input goatOS agents can review:

```ts
const tokenReview = {
  symbol: "$GOS",
  chain: "solana",
  tokenContractAddress: "EkDecrmH4rgsrx2zuwPpQ1dKd5AB9sqVxgDWhmQVpump",
  requestedAgent: "risk-01",
  task: "score holder concentration, liquidity, dev wallet behavior, and social velocity"
};
```

The output should be a structured risk review or thesis, not a profit claim.

## Safety Model

- LLMs never receive private keys.
- Agents cannot directly execute wallet actions.
- Actions must pass policy, simulation, approval, GOAT SDK wrapper, and logging.
- Mock mode is enabled when keys are missing.
- Dry-run mode and human approval are enabled by default.

## Common Commands

Run these from `goat-os/`:

```bash
npm run dev
npm run build
npm test
npm run typecheck
npm run db:generate
npm run db:push
npm run db:seed
```

## Contributing

Before opening a pull request:

```bash
cd goat-os
npm run typecheck
npm test
npm run build
```

Keep contributions aligned with the core rules:

- Keep wallet actions behind the GOAT SDK wrapper.
- Keep mock fallback behavior working.
- Validate API input with Zod.
- Add tests for policy, risk, approval, or execution changes.
- Do not add hype, profit guarantees, or unsafe autonomous trading defaults.

## Project Layout

```text
goat-os/src/app          Pages and API routes
goat-os/src/components   UI components
goat-os/src/lib/agents   Agent runtime
goat-os/src/lib/goat     GOAT SDK wrapper
goat-os/src/lib/policy   Policy engine
goat-os/src/lib/tokens   Token intelligence
goat-os/tests            Unit tests
goat-os/prisma           Database schema and seed data
```
