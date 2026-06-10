export function EmergencyPauseButton({ paused }: { paused: boolean }) {
  return <form action="/api/emergency-pause" method="post"><button className={`rounded px-3 py-2 text-sm font-semibold ${paused ? "bg-signal text-field" : "bg-danger text-white"}`} name="paused" value={paused ? "false" : "true"}>{paused ? "Disable Emergency Pause" : "Enable Emergency Pause"}</button></form>;
}
