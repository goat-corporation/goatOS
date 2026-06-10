import { AgentCard } from "@/components/agents/AgentCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { getAgents } from "@/lib/agents/registry";

export default async function HomePage() {
  const agents = await getAgents();
  return (
    <DashboardShell>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="font-mono text-sm text-signal">public AI research treasury</div>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-normal text-zinc-50">goatOS</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">A transparent AI-agent operating system that finds, scores, funds, and optionally trades Solana memecoins through policy-constrained GOAT SDK wallet actions.</p>
          <div className="mt-6 flex gap-3"><a href="/dashboard" className="rounded bg-signal px-4 py-2 font-semibold text-field">Enter dashboard</a><a href="/governance" className="rounded border border-line px-4 py-2 text-zinc-300">Review policy</a></div>
        </div>
        <div className="rounded border border-line bg-panel p-4">
          <div className="font-semibold">Constrained wallet actions</div>
          <p className="mt-2 text-sm text-zinc-400">LLMs never receive private keys and never execute directly. Every action becomes a typed proposal, passes policy, simulation, approval or autonomous checks, a GOAT SDK wrapper, persistence, and public logging.</p>
        </div>
      </section>
      <section className="mt-8 rounded border border-line bg-panel p-4">
        <div className="font-semibold">Core loop</div>
        <div className="mt-4 grid gap-2 text-sm md:grid-cols-5">
          {["Scout finds token", "Risk scores", "Trader proposes", "Governor gates", "GOAT executes + logs"].map((step) => <div key={step} className="rounded bg-field p-3 font-mono text-zinc-300">{step}</div>)}
        </div>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">{agents.slice(0, 3).map((agent) => <AgentCard key={agent.id} agent={agent} />)}</section>
    </DashboardShell>
  );
}
