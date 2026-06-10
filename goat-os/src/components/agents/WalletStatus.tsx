export function WalletStatus({ address }: { address: string }) {
  return <span className="font-mono text-[11px] text-mineral-500">{address.slice(0, 10)}...{address.slice(-6)}</span>;
}
