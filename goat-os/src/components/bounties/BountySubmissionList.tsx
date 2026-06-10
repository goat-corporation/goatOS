export function BountySubmissionList({ count }: { count: number }) {
  return <div className="rounded-2xl border border-line bg-card p-5"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mineral-500">Submissions</div><div className="mt-3 font-mono text-4xl leading-none text-mineral-50">{count}</div><div className="mt-3 text-sm text-mineral-300">{count} entries are recorded in the mock review queue.</div></div>;
}
