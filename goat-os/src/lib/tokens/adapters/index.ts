import { BirdeyeAdapter } from "@/lib/tokens/adapters/birdeye";
import { DexscreenerAdapter } from "@/lib/tokens/adapters/dexscreener";
import { HeliusAdapter } from "@/lib/tokens/adapters/helius";
import { JupiterAdapter } from "@/lib/tokens/adapters/jupiter";
import { PumpLaunchAdapter } from "@/lib/tokens/adapters/pump-launch";
import { TelegramAdapter } from "@/lib/tokens/adapters/telegram";
import { XSocialAdapter } from "@/lib/tokens/adapters/x-social";

export const tokenAdapters = [
  new DexscreenerAdapter(),
  new BirdeyeAdapter(),
  new JupiterAdapter(),
  new HeliusAdapter(),
  new PumpLaunchAdapter(),
  new XSocialAdapter(),
  new TelegramAdapter()
];
