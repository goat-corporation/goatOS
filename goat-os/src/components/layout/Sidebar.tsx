const nav = [
  { href: "/dashboard", label: "Command" },
  { href: "/agents", label: "Agents" },
  { href: "/tokens", label: "Tokens" },
  { href: "/theses", label: "Theses" },
  { href: "/bounties", label: "Bounties" },
  { href: "/governance", label: "Policy" },
  { href: "/settings", label: "Systems" }
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 border-r border-line bg-panel/90 p-5 backdrop-blur md:block">
      <a href="/" className="block">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-mineral-500">operating system</div>
        <div className="mt-2 font-mono text-xl tracking-tight text-signal">goatOS</div>
      </a>
      <div className="mt-8 rounded-2xl border border-line bg-field/80 p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mineral-500">runtime posture</div>
        <div className="mt-3 flex items-center gap-2 text-sm text-mineral-100">
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_18px_rgba(114,244,212,0.7)]" />
          dry-run armed
        </div>
        <div className="mt-3 h-px bg-line" />
        <div className="mt-3 font-mono text-[11px] leading-5 text-mineral-500">policy / simulation / approval / GOAT wrapper</div>
      </div>
      <nav className="mt-8 space-y-1">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 text-sm text-mineral-300 transition hover:border-line hover:bg-card hover:text-mineral-50">
            <span>{item.label}</span>
            <span className="font-mono text-[10px] text-mineral-700 group-hover:text-signal">0{nav.indexOf(item) + 1}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
