import { AgentCard } from "@/components/agents/AgentCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SystemHero } from "@/components/system/SystemHero";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader, Surface } from "@/components/ui/Surface";
import { getAgents } from "@/lib/agents/registry";
import { store } from "@/lib/mock-store";
import { getAllTheses } from "@/lib/theses/create";
import { getTokens } from "@/lib/tokens/profile";

export default async function HomePage() {
  const [agents, tokens, theses] = await Promise.all([getAgents(), getTokens(), getAllTheses()]);
  return (
    <DashboardShell>
      <section className="grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8"><SystemHero agents={agents} tokens={tokens} theses={theses} mandate={store.mandate.type} /></div>
        <div className="grid gap-4 xl:col-span-4">
          <Surface pale>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5F6A61]">constrained wallet actions</div>
            <p className="mt-4 text-sm leading-6 text-ink">LLMs never receive private keys and never execute directly. Every action becomes a typed proposal, passes policy, simulation, approval or autonomous checks, a GOAT SDK wrapper, persistence, and public logging.</p>
          </Surface>
          <MetricCard label="Agent nodes" value={agents.length} unit="online" tone="good" />
          <MetricCard label="Research theses" value={theses.length} unit="public" />
          <div className="flex gap-3"><a href="/dashboard" className="rounded-xl border border-pale bg-pale px-4 py-2 text-sm font-medium text-ink transition hover:bg-mineral-100">Enter dashboard</a><a href="/governance" className="rounded-xl border border-line-strong bg-control px-4 py-2 text-sm text-mineral-100 transition hover:border-signal/45">Review policy</a></div>
        </div>
      </section>
      <section className="mt-8">
        <SectionHeader eyebrow="execution loop" title="Public research treasury flow" />
        <div className="grid gap-3 text-sm md:grid-cols-5">
          {["Scout finds token", "Risk scores", "Trader proposes", "Governor gates", "GOAT executes + logs"].map((step, index) => <div key={step} className="rounded-2xl border border-line bg-card p-4 font-mono text-mineral-300"><span className="mb-3 block text-[10px] text-mineral-700">0{index + 1}</span>{step}</div>)}
        </div>
      </section>
      <section className="mt-8"><SectionHeader eyebrow="preview" title="Operating agents" /><div className="grid gap-4 md:grid-cols-3">{agents.slice(0, 3).map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div></section>
    </DashboardShell>
  );
}
