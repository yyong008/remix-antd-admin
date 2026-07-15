import { clsx } from "clsx";
import type { ReactNode } from "react";
import { FileTextIcon } from "~/components/icons";

interface EmptyStateProps {
  icon?: ReactNode;
  text: string;
  className?: string;
}

export function EmptyState({ icon, text, className }: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-brand-surface text-brand-primary">
        {icon ?? <FileTextIcon className="size-6" />}
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
