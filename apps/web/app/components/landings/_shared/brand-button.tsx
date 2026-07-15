import { clsx } from "clsx";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface BrandButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: boolean;
  external?: boolean;
  className?: string;
  "aria-label"?: string;
}

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-white shadow-[0_8px_24px_var(--brand-glow)] hover:bg-brand-primary-600 hover:shadow-[0_12px_32px_var(--brand-glow)]",
  secondary:
    "border border-border bg-background text-foreground hover:border-brand-border hover:bg-brand-surface hover:text-brand-primary",
  ghost: "text-muted-foreground hover:text-brand-primary hover:bg-brand-surface",
};

export function BrandButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight = false,
  external = false,
  className,
  ...rest
}: BrandButtonProps) {
  const classes = clsx(
    "group/btn inline-flex select-none items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
    sizeClasses[size],
    variantClasses[variant],
    className,
  );

  const inner = (
    <>
      {iconLeft ? <span className="shrink-0">{iconLeft}</span> : null}
      {children}
      {iconRight ? (
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {inner}
    </button>
  );
}

export function BrandIconButton({
  href,
  children,
  external = false,
  label,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={clsx(
        "inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-brand-border hover:bg-brand-surface hover:text-brand-primary",
        className,
      )}
    >
      {children}
    </a>
  );
}
