import { AiIcons } from "@workspace/custom-icons/ai-icons/index";
import { cn } from "@workspace/ui/lib/utils";

const modes = [
  {
    name: "Claude",
    icons: AiIcons.claude,
    description: "Anthropic's advanced AI",
  },
  {
    name: "OpenAI",
    icons: AiIcons.openai,
    description: "GPT models and API",
  },
  {
    name: "DeepSeek",
    icons: AiIcons.deepseek,
    description: "Cost-effective AI models",
  },
  {
    name: "Gemini",
    icons: AiIcons.gemini,
    description: "Google's AI platform",
  },
  {
    name: "xAI",
    icons: AiIcons.xai,
    description: "Grok models",
  },
];

interface AiModesProps {
  className?: string;
  columns?: 2 | 3 | 4 | 5;
}

export function AiModes({ className, columns = 5 }: AiModesProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  };

  return (
    <div className={cn("grid gap-3 my-6", gridCols[columns], className)}>
      {modes.map((mode) => {
        const IconComponent = mode.icons;
        return (
          <div
            key={mode.name}
            className="group relative flex flex-col items-center justify-center gap-1 bg-muted/50 hover:bg-muted border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-12 h-12 text-foreground/80 group-hover:text-foreground transition-colors">
              <IconComponent className="w-full h-full" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-xs mb-0.5">{mode.name}</h3>
              {/* <p className="text-[10px] text-muted-foreground leading-tight">{mode.description}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
