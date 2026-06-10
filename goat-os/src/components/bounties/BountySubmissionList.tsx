export function BountySubmissionList({ count }: { count: number }) {
  return <div className="rounded border border-line bg-panel p-4"><div className="font-semibold">Submissions</div><div className="mt-2 text-sm text-zinc-400">{count} entries are recorded in the mock review queue.</div></div>;
}
