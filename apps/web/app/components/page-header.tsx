import { clsx } from "clsx";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <header className={clsx("mb-8", className)}>
      {eyebrow ? (
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-primary">
          <span className="size-1.5 rounded-full bg-brand-primary" />
          {eyebrow}
        </span>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground lg:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
