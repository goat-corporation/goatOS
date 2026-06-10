const nav = ["/dashboard", "/agents", "/tokens", "/theses", "/bounties", "/governance", "/settings"];

export function Sidebar() {
  return <aside className="hidden w-56 border-r border-line bg-field p-4 md:block"><a href="/" className="font-mono text-lg text-signal">goatOS</a><nav className="mt-8 space-y-1">{nav.map((href) => <a key={href} href={href} className="block rounded px-3 py-2 text-sm text-zinc-300 hover:bg-panel">{href.slice(1)}</a>)}</nav></aside>;
}
