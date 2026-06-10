import type { GoatSimulationResult } from "@/lib/goat/actions";

export function SimulationResult({ result }: { result?: GoatSimulationResult }) {
  if (!result) return null;
  return <div className="rounded-2xl border border-line bg-card p-5 text-sm"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Simulation</div><div className="mt-3 font-mono text-signal">{result.success ? "success" : "failed"} · fee {result.estimatedFeeSol} SOL</div><div className="mt-2 text-mineral-300">{result.expectedOutput}</div></div>;
}
