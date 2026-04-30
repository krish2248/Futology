import { cn } from "@/lib/utils/cn";

type Props = {
  variant?: "full" | "dot";
  className?: string;
};

export function LiveBadge({ variant = "full", className }: Props) {
  if (variant === "dot") {
    return <span aria-label="Live" className={cn("live-dot", className)} />;
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-live/40 bg-live/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-live",
        className,
      )}
    >
      <span className="live-dot h-1.5 w-1.5" aria-hidden />
      Live
    </span>
  );
}
