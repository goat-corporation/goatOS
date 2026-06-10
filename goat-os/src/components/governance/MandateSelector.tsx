export function MandateSelector({ active }: { active: string }) {
  const mandates = ["GRAZE", "NIBBLE", "STAMPEDE", "PATRON", "PURGE", "ARCHIVE"];
  return (
    <div className="flex flex-wrap gap-2">
      {mandates.map((mandate) => (
        <form key={mandate} action="/api/emergency-pause" method="post">
          <button className={`rounded-xl border px-3 py-2 font-mono text-[11px] transition ${mandate === active ? "border-pale bg-pale text-ink" : "border-line-strong bg-control text-mineral-300 hover:border-signal/45 hover:text-signal"}`} name="mandate" value={mandate}>{mandate}</button>
        </form>
      ))}
    </div>
  );
}
