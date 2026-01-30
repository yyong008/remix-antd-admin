import { AiIcons } from "@workspace/custom-icons/ai-icons/index";
import { cn } from "@workspace/ui/lib/utils";

const editors = [
  {
    name: "Cursor",
    icons: AiIcons.cursor,
    description: "AI-powered code editor",
  },
  {
    name: "VS Code",
    icons: AiIcons.vscode,
    description: "Popular code editor with extensions",
  },
  {
    name: "Zed",
    icons: AiIcons.zed,
    description: "High-performance editor",
  },
  {
    name: "Windsurf",
    icons: AiIcons.windsurf,
    description: "AI-native development environment",
  },
];

interface AiEditorsProps {
  className?: string;
  columns?: 2 | 3 | 4;
}

export function AiEditors({ className, columns = 4 }: AiEditorsProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-3 my-6", gridCols[columns], className)}>
      {editors.map((editor) => {
        const IconComponent = editor.icons;
        return (
          <div
            key={editor.name}
            className="group relative flex flex-col items-center justify-center gap-2 bg-muted/50 hover:bg-muted border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-12 h-12 text-foreground/80 group-hover:text-foreground transition-colors">
              <IconComponent className="w-full h-full" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-xs mb-0.5">{editor.name}</h3>
              {/* <p className="text-[10px] text-muted-foreground leading-tight">{editor.description}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
