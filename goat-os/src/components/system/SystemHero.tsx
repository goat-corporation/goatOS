import type { AgentProfile } from "@/types/agents";
import type { TokenProfile } from "@/types/tokens";
import type { Thesis } from "@/types/theses";
import { Surface } from "@/components/ui/Surface";

export function SystemHero({
  agents,
  tokens,
  theses,
  mandate
}: {
  agents: AgentProfile[];
  tokens: TokenProfile[];
  theses: Thesis[];
  mandate: string;
}) {
  const pendingAgents = agents.filter((agent) => agent.status === "RUNNING").length;
  const avgRisk = Math.round(tokens.reduce((sum, token) => sum + token.bundleRisk, 0) / Math.max(tokens.length, 1));

  return (
    <Surface active className="relative min-h-[430px] overflow-hidden p-0 scanline" as="section">
      <div className="absolute inset-0 technical-grid opacity-70" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" />
      <div className="relative z-10 flex h-full min-h-[430px] flex-col justify-between p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">goatOS operating surface</div>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight text-mineral-50 md:text-4xl">Solana memecoin agent control plane</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-mineral-300">Policy-constrained agents route discovery, risk, proposals, approvals, and GOAT SDK execution through a public telemetry trail.</p>
          </div>
          <div className="rounded-xl border border-line-strong bg-panel/80 px-3 py-2 text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mineral-500">mandate</div>
            <div className="mt-1 font-mono text-lg text-signal">{mandate}</div>
          </div>
        </div>

        <div className="relative mx-auto my-8 aspect-[1.55/1] w-full max-w-3xl">
          <svg className="h-full w-full" viewBox="0 0 760 490" role="img" aria-label="goatOS agent routing schematic">
            <defs>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#72F4D4" stopOpacity="0.34" />
                <stop offset="58%" stopColor="#72F4D4" stopOpacity="0.055" />
                <stop offset="100%" stopColor="#72F4D4" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="rail" x1="0" x2="1">
                <stop offset="0%" stopColor="#72F4D4" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#DDE8DC" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#FF7A2F" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <ellipse cx="380" cy="246" rx="245" ry="150" fill="url(#coreGlow)" />
            <path d="M134 246 C232 110 526 110 626 246 C526 382 232 382 134 246Z" fill="rgba(11,13,12,0.68)" stroke="#343A37" />
            <path d="M179 246 C258 153 502 153 581 246 C502 339 258 339 179 246Z" fill="none" stroke="url(#rail)" strokeWidth="1.4" />
            <path d="M230 246 C288 193 472 193 530 246 C472 299 288 299 230 246Z" fill="none" stroke="#72F4D4" strokeOpacity="0.44" />
            <circle cx="380" cy="246" r="58" fill="#111312" stroke="#DDE8DC" strokeOpacity="0.55" />
            <circle cx="380" cy="246" r="24" fill="#72F4D4" fillOpacity="0.18" stroke="#72F4D4" />
            {[0, 1, 2, 3, 4, 5].map((node) => {
              const angle = (Math.PI * 2 * node) / 6 - Math.PI / 2;
              const x = 380 + Math.cos(angle) * 200;
              const y = 246 + Math.sin(angle) * 122;
              return (
                <g key={node}>
                  <line x1="380" y1="246" x2={x} y2={y} stroke="#DDE8DC" strokeOpacity="0.13" />
                  <circle cx={x} cy={y} r="22" fill="#0B0D0C" stroke="#343A37" />
                  <circle cx={x} cy={y} r="5" fill={node === 2 ? "#FF7A2F" : "#72F4D4"} opacity="0.9" />
                </g>
              );
            })}
            <path d="M82 398 H244 M516 94 H684 M76 116 H228 M538 400 H694" stroke="#343A37" />
          </svg>
          <Callout className="left-2 top-6" label="SCOUT" value={`${tokens.length} feeds`} />
          <Callout className="right-0 top-10" label="RISK" value={`avg bundle ${avgRisk}`} />
          <Callout className="bottom-8 left-8" label="APPROVAL" value={`${theses.filter((t) => t.status === "OPEN").length} open theses`} />
          <Callout className="bottom-4 right-8" label="AGENTS" value={`${pendingAgents} running`} />
        </div>

        <div className="grid gap-3 border-t border-line pt-4 font-mono text-[11px] text-mineral-500 md:grid-cols-4">
          <div><span className="text-mineral-300">WALLET PATH</span> / proposal-policy-sim-approval</div>
          <div><span className="text-mineral-300">MOCK FALLBACK</span> / deterministic</div>
          <div><span className="text-mineral-300">LOG STREAM</span> / public</div>
          <div><span className="text-mineral-300">EXECUTION</span> / GOAT wrapper</div>
        </div>
      </div>
    </Surface>
  );
}

function Callout({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`absolute rounded-lg border border-line-strong bg-panel/85 px-3 py-2 backdrop-blur ${className}`}>
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-mineral-500">{label}</div>
      <div className="mt-1 font-mono text-xs text-mineral-100">{value}</div>
    </div>
  );
}
