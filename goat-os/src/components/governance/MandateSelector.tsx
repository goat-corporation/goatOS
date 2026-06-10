export function MandateSelector({ active }: { active: string }) {
  const mandates = ["GRAZE", "NIBBLE", "STAMPEDE", "PATRON", "PURGE", "ARCHIVE"];
  return (
    <div className="flex flex-wrap gap-2">
      {mandates.map((mandate) => (
        <form key={mandate} action="/api/emergency-pause" method="post">
          <button className={`rounded border px-3 py-2 font-mono text-xs ${mandate === active ? "border-signal text-signal" : "border-line text-zinc-400"}`} name="mandate" value={mandate}>{mandate}</button>
        </form>
      ))}
    </div>
  );
}
