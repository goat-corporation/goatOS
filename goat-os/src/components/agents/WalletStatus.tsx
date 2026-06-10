export function WalletStatus({ address }: { address: string }) {
  return <span className="font-mono text-xs text-zinc-400">{address.slice(0, 10)}...{address.slice(-6)}</span>;
}
