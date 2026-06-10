export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-field/82 px-4 py-3 backdrop-blur-xl md:px-8 xl:px-14">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4">
        <a href="/" className="font-mono text-signal md:hidden">goatOS</a>
        <div className="hidden items-center gap-3 text-xs text-mineral-500 md:flex">
          <span className="font-mono uppercase tracking-[0.2em]">mainnet-beta telemetry</span>
          <span className="h-1 w-1 rounded-full bg-mineral-700" />
          <span>policy constrained public action log</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-line bg-card px-3 py-1.5 font-mono text-[11px] text-mineral-300">MOCK SAFE</span>
          <a href="/dashboard" className="rounded-full border border-line-strong bg-control px-3 py-1.5 text-xs text-mineral-100 transition hover:border-signal/50">Dashboard</a>
        </div>
      </div>
    </header>
  );
}
