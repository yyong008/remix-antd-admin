import { clsx } from "clsx";

interface CategoryPillsProps {
  options: Array<{ id: string; name: string }>;
  value: string;
  onChange: (id: string) => void;
  allLabel: string;
  className?: string;
}

export function CategoryPills({
  options,
  value,
  onChange,
  allLabel,
  className,
}: CategoryPillsProps) {
  const base =
    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer";
  return (
    <div className={clsx("flex flex-wrap gap-2", className)}>
      <button
        type="button"
        onClick={() => onChange("")}
        className={clsx(
          base,
          !value
            ? "border-brand-primary bg-brand-primary text-white shadow-[0_8px_24px_var(--brand-glow)]"
            : "border-border bg-transparent text-foreground hover:border-brand-border hover:bg-brand-surface",
        )}
      >
        {allLabel}
      </button>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={clsx(
            base,
            value === opt.id
              ? "border-brand-primary bg-brand-primary text-white shadow-[0_8px_24px_var(--brand-glow)]"
              : "border-border bg-transparent text-foreground hover:border-brand-border hover:bg-brand-surface",
          )}
        >
          {opt.name}
        </button>
      ))}
    </div>
  );
}
