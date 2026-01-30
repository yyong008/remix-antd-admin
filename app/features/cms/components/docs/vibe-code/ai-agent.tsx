import { AiIcons } from "@workspace/custom-icons/ai-icons/index";
import { cn } from "@workspace/ui/lib/utils";

const agents = [
  {
    name: "Claude",
    icons: AiIcons.claude,
    description: "Anthropic's AI assistant",
  },
  {
    name: "Codex",
    icons: AiIcons.openai,
    description: "GPT models and API",
  },
  {
    name: "Cursor",
    icons: AiIcons.cursor,
    description: "AI code editor",
  },
  {
    name: "GitHub Copilot",
    icons: AiIcons.copilot,
    description: "AI pair programmer",
  },
  {
    name: "OpenCode",
    icons: AiIcons.opencode,
    description: "AI OpenCode assistant",
    className: "w-32",
  },
];

interface AiAgentProps {
  className?: string;
  columns?: 2 | 3 | 4;
}

export function AiAgent({ className, columns = 4 }: AiAgentProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-3 my-6", gridCols[columns], className)}>
      {agents.map((agent) => {
        const IconComponent = agent.icons;
        return (
          <div
            key={agent.name}
            className="group relative flex flex-col items-center justify-center gap-1 bg-muted/50 hover:bg-muted border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            <div
              className={cn(
                "flex items-center justify-center  text-foreground/80 group-hover:text-foreground transition-colors w-10 h-10",
                agent.className
              )}
            >
              <IconComponent className="w-full h-full" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-xs mb-0.5">{agent.name}</h3>
              {/* <p className="text-[10px] text-muted-foreground leading-tight">{agent.description}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
