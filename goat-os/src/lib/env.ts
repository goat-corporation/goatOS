import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/goatos"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  OPENAI_API_KEY: z.string().optional().default(""),
  OPENAI_MODEL: z.string().default("gpt-4.1-mini"),
  SOLANA_RPC_URL: z.string().url().default("https://api.mainnet-beta.solana.com"),
  SOLANA_CLUSTER: z.string().default("mainnet-beta"),
  GOAT_SDK_API_KEY: z.string().optional().default(""),
  GOAT_WALLET_SECRET: z.string().optional().default(""),
  HELIUS_API_KEY: z.string().optional().default(""),
  BIRDEYE_API_KEY: z.string().optional().default(""),
  DEXSCREENER_API_KEY: z.string().optional().default(""),
  JUPITER_API_KEY: z.string().optional().default(""),
  REDIS_URL: z.string().optional().default(""),
  MOCK_MODE: z.string().default("true"),
  DRY_RUN_ONLY: z.string().default("true"),
  AUTONOMOUS_MODE_ENABLED: z.string().default("false")
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment: ${parsed.error.message}`);
}

export const env = {
  ...parsed.data,
  MOCK_MODE: parsed.data.MOCK_MODE === "true",
  DRY_RUN_ONLY: parsed.data.DRY_RUN_ONLY === "true",
  AUTONOMOUS_MODE_ENABLED: parsed.data.AUTONOMOUS_MODE_ENABLED === "true",
  get goatLiveEnabled() {
    return Boolean(parsed.data.GOAT_SDK_API_KEY && parsed.data.GOAT_WALLET_SECRET && parsed.data.MOCK_MODE !== "true");
  },
  get llmLiveEnabled() {
    return Boolean(parsed.data.OPENAI_API_KEY && parsed.data.MOCK_MODE !== "true");
  }
};
