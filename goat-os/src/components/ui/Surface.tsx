import { clsx } from "clsx";

export function Surface({
  children,
  className,
  pale = false,
  active = false,
  as: Component = "div"
}: {
  children: React.ReactNode;
  className?: string;
  pale?: boolean;
  active?: boolean;
  as?: "div" | "section" | "article" | "aside";
}) {
  return (
    <Component
      className={clsx(
        "rounded-2xl border p-5 transition-colors duration-150",
        pale
          ? "border-pale/50 bg-pale text-ink"
          : "border-line bg-card/95 text-mineral-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]",
        active && "border-line-active/70 shadow-[inset_0_0_0_1px_rgba(221,232,220,0.08),0_0_42px_rgba(114,244,212,0.055)]",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  meta,
  action
}: {
  eyebrow?: string;
  title: string;
  meta?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        {eyebrow && <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mineral-500">{eyebrow}</div>}
        <h2 className="mt-1 text-lg font-medium text-mineral-50">{title}</h2>
        {meta && <p className="mt-1 text-sm leading-6 text-mineral-300">{meta}</p>}
      </div>
      {action}
    </div>
  );
}

export function TechnicalButton({
  children,
  className,
  tone = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "default" | "primary" | "danger" | "pale" }) {
  return (
    <button
      className={clsx(
        "rounded-xl border px-3 py-2 text-xs font-medium transition duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-signal",
        tone === "default" && "border-line-strong bg-control text-mineral-100 hover:border-mineral-500 hover:bg-elevated",
        tone === "primary" && "border-signal/50 bg-signal/14 text-signal hover:bg-signal/20",
        tone === "danger" && "border-danger/50 bg-danger/12 text-danger hover:bg-danger/18",
        tone === "pale" && "border-pale bg-pale text-ink hover:bg-mineral-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function PacketBar({ value, tone = "mint" }: { value: number; tone?: "mint" | "solar" | "red" | "blue" }) {
  const width = Math.max(0, Math.min(100, value));
  const tones = {
    mint: "bg-signal",
    solar: "bg-solar",
    red: "bg-danger",
    blue: "bg-blue"
  };
  return (
    <div className="h-1.5 rounded-full bg-control">
      <div className={clsx("h-full rounded-full", tones[tone])} style={{ width: `${width}%` }} />
    </div>
  );
}
