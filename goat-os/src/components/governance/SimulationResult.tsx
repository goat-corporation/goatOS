import type { GoatSimulationResult } from "@/lib/goat/actions";

export function SimulationResult({ result }: { result?: GoatSimulationResult }) {
  if (!result) return null;
  return <div className="rounded border border-line bg-panel p-4 text-sm"><div className="font-semibold">Simulation</div><div className="mt-2 font-mono text-signal">{result.success ? "success" : "failed"} · fee {result.estimatedFeeSol} SOL</div><div className="mt-1 text-zinc-400">{result.expectedOutput}</div></div>;
}
