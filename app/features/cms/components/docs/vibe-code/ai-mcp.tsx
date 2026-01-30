import { AiIcons } from "@workspace/custom-icons/ai-icons/index";
import { cn } from "@workspace/ui/lib/utils";

interface AiMcpProps {
  className?: string;
}

export function AiMcp({ className }: AiMcpProps) {
  const McpIcon = AiIcons.mcp;

  return (
    <div className={cn("flex my-6", className)}>
      <div className="group relative flex flex-col items-center justify-center gap-2 bg-muted/50 hover:bg-muted border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02] w-[120px]">
        <div className="flex items-center justify-center w-12 h-12 text-foreground/80 group-hover:text-foreground transition-colors">
          <McpIcon className="w-full h-full" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-xs mb-0.5">MCP</h3>
        </div>
      </div>
    </div>
  );
}
