import { clsx } from "clsx";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={clsx(
        "group/feature relative h-full rounded-2xl border border-border bg-card p-px transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand-border hover:shadow-[0_20px_40px_var(--brand-glow)]",
        className,
      )}
    >
      <div className="flex h-full flex-col rounded-[15px] bg-card p-7">
        <div
          className="mb-5 flex size-14 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover/feature:scale-110"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
            boxShadow: "0 8px 24px var(--brand-glow)",
          }}
        >
          {icon}
        </div>
        <h4 className="mb-2 font-semibold text-foreground transition-colors duration-300 group-hover/feature:text-brand-primary">
          {title}
        </h4>
        <p className="m-0 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
