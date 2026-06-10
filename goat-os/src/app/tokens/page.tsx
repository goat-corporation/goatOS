import { DashboardShell } from "@/components/layout/DashboardShell";
import { TokenTable } from "@/components/tokens/TokenTable";
import { SectionHeader } from "@/components/ui/Surface";
import { getTokens } from "@/lib/tokens/profile";

export default async function TokensPage() {
  const tokens = await getTokens();
  return <DashboardShell><SectionHeader eyebrow="market sensors" title="Token Intelligence" meta="Liquidity, concentration, social velocity, and thesis state for watched Solana launches." /><TokenTable tokens={tokens} /></DashboardShell>;
}
