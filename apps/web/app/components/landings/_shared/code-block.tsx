import { useState } from "react";
import { clsx } from "clsx";
import { CopyIcon, CheckIcon } from "./icons";

interface CommandItem {
  label: string;
  command: string;
}

interface CodeBlockProps {
  commands: CommandItem[];
  className?: string;
}

export function CodeBlock({ commands, className }: CodeBlockProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex((cur) => (cur === index ? null : cur)), 1500);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-xl border border-border bg-[var(--background)] text-sm shadow-sm",
        className,
      )}
    >
      {commands.map((item, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-center gap-3 px-4 py-3",
            index !== 0 && "border-t border-border/60",
          )}
        >
          <span className="w-20 shrink-0 text-xs font-medium text-muted-foreground">
            {item.label}
          </span>
          <code className="flex-1 truncate font-mono text-foreground">{item.command}</code>
          <button
            type="button"
            onClick={() => handleCopy(item.command, index)}
            aria-label={`Copy ${item.label} command`}
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-brand-surface hover:text-brand-primary"
          >
            {copiedIndex === index ? (
              <CheckIcon className="size-4" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
