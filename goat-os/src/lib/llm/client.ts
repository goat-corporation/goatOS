import { env } from "@/lib/env";

export function getLlmClient() {
  return { mode: env.llmLiveEnabled ? "live" : "mock", model: env.OPENAI_MODEL };
}
