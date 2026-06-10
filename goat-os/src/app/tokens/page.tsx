import { DashboardShell } from "@/components/layout/DashboardShell";
import { TokenTable } from "@/components/tokens/TokenTable";
import { getTokens } from "@/lib/tokens/profile";

export default async function TokensPage() {
  const tokens = await getTokens();
  return <DashboardShell><h1 className="text-2xl font-semibold">Token Intelligence</h1><div className="mt-5"><TokenTable tokens={tokens} /></div></DashboardShell>;
}
