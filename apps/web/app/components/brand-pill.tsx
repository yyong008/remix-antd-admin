import { clsx } from "clsx";
import type { ReactNode } from "react";

interface BrandPillProps {
  icon?: ReactNode;
  children: ReactNode;
  variant?: "soft" | "solid";
  className?: string;
}

export function BrandPill({ icon, children, variant = "soft", className }: BrandPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        variant === "solid"
          ? "bg-brand-primary text-white"
          : "border border-brand-border bg-brand-surface text-brand-primary",
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      {children}
    </span>
  );
}
