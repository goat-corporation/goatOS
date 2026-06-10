export function EmergencyPauseButton({ paused }: { paused: boolean }) {
  return <form action="/api/emergency-pause" method="post"><button className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${paused ? "border-signal/50 bg-signal/14 text-signal hover:bg-signal/20" : "border-danger/50 bg-danger/12 text-danger hover:bg-danger/18"}`} name="paused" value={paused ? "false" : "true"}>{paused ? "Disable Emergency Pause" : "Enable Emergency Pause"}</button></form>;
}
