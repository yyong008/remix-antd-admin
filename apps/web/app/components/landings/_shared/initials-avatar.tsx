import { clsx } from "clsx";

interface InitialsAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

const gradients = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#6366f1)",
  "linear-gradient(135deg,#10b981,#0ea5e9)",
  "linear-gradient(135deg,#f59e0b,#ec4899)",
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#14b8a6,#6366f1)",
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashIndex(str: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}

export function InitialsAvatar({ name, size = 44, className }: InitialsAvatarProps) {
  const gradient = gradients[hashIndex(name, gradients.length)];
  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-background",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: gradient,
      }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  );
}
