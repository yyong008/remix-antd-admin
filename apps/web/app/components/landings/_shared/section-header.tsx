import { clsx } from "clsx";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={clsx("flex flex-col gap-3 max-w-2xl", alignment, className)}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-primary">
          <span className="size-1.5 rounded-full bg-brand-primary motion-safe:animate-[brand-pulse-soft_3s_ease-in-out_infinite]" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-balance text-foreground lg:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
