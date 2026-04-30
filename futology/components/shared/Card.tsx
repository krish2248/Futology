import { cn } from "@/lib/utils/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  elevated?: boolean;
};

export function Card({
  className,
  hover = false,
  elevated = false,
  ...rest
}: Props) {
  return (
    <div
      className={cn(
        elevated ? "surface-elevated" : "surface",
        hover && "surface-hover",
        "p-4 md:p-6",
        className,
      )}
      {...rest}
    />
  );
}
