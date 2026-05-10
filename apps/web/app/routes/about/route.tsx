import type { LoaderFunctionArgs } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Avatar } from "@workspace/ui/components/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";
import { IconExternalLink } from "@tabler/icons-react";

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

const TECH_STACK_ICONS: Record<string, { icon: string; color: string }> = {
  react: { icon: "⚛️", color: "#61DAFB" },
  "react-router": { icon: "🚀", color: "#FF6B6B" },
  vite: { icon: "⚡", color: "#646CFF" },
  tailwind: { icon: "🎨", color: "#38BDF8" },
  hono: { icon: "🔥", color: "#E3602C" },
  drizzle: { icon: "🗄️", color: "#0EA5E9" },
  typescript: { icon: "📘", color: "#3178C6" },
  aiSdk: { icon: "🤖", color: "#10B981" },
};

function getTechIcon(depName: string) {
  const lower = depName.toLowerCase();
  for (const [key, value] of Object.entries(TECH_STACK_ICONS)) {
    if (lower.includes(key)) {
      return value;
    }
  }
  return { icon: "📦", color: "#8B8B8B" };
}

const mockData = {
  projectName: "React Router Antd Admin",
  description: "基于 React Router v7 + Hono + Tailwind CSS 的全栈 AI 管理后台模板，集成现代 Web 工具链与最佳实践。",
  repoUrl: "https://github.com/yyong008/remix-antd-admin",
  homepage: "https://remix-antd-admin.vercel.app",
  version: "1.0.0",
  lastBuildTime: new Date().toISOString().split("T")[0],
  productionDeps: [
    { name: "react", version: "19.x", url: "https://www.npmjs.com/package/react" },
    { name: "react-router", version: "7.x", url: "https://www.npmjs.com/package/react-router" },
    { name: "vite", version: "7.x", url: "https://www.npmjs.com/package/vite" },
    { name: "tailwindcss", version: "4.x", url: "https://www.npmjs.com/package/tailwindcss" },
    { name: "hono", version: "4.x", url: "https://www.npmjs.com/package/hono" },
    { name: "drizzle-orm", version: "0.38.x", url: "https://www.npmjs.com/package/drizzle-orm" },
  ],
  developmentDeps: [
    { name: "typescript", version: "5.x", url: "https://www.npmjs.com/package/typescript" },
    { name: "vitest", version: "2.x", url: "https://www.npmjs.com/package/vitest" },
  ],
};

export function Route() {
  const data = mockData;

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <Card
        className="mb-8 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 16,
        }}
      >
        <CardContent className="p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{data.projectName}</h1>
              <p className="text-white/90 text-base leading-relaxed mb-6">{data.description}</p>
              <div className="flex gap-3">
                <a
                  href={data.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <IconExternalLink className="size-4" />
                  GitHub
                </a>
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <IconExternalLink className="size-4" />
                  预览
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl p-4 text-center backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-white/70 text-xs">版本</p>
                <h3 className="text-white text-2xl font-semibold mt-2">{data.version}</h3>
              </div>
              <div
                className="rounded-xl p-4 text-center backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-white/70 text-xs">最后编译</p>
                <h5 className="text-white text-sm font-medium mt-2">{data.lastBuildTime}</h5>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl">技术栈</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.productionDeps
              .filter((dep) => {
                const name = dep.name.toLowerCase();
                return (
                  name.includes("react") ||
                  name.includes("router") ||
                  name.includes("vite") ||
                  name.includes("tailwind") ||
                  name.includes("hono") ||
                  name.includes("drizzle") ||
                  name.includes("typescript") ||
                  name.includes("ai-sdk")
                );
              })
              .slice(0, 9)
              .map((dep) => {
                const tech = getTechIcon(dep.name);
                return (
                  <Tooltip key={dep.name}>
                    <TooltipTrigger>
                      <div
                        className="flex flex-col items-center p-4 rounded-lg border-2 text-center cursor-pointer transition-all hover:scale-105"
                        style={{ borderColor: `${tech.color}30` }}
                      >
                        <Avatar className="size-12 mb-2" style={{ backgroundColor: tech.color }}>
                          <span className="text-xl">{tech.icon}</span>
                        </Avatar>
                        <span className="text-sm font-medium truncate w-full">{dep.name}</span>
                        <span className="text-xs text-muted-foreground">{dep.version}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{dep.name}@{dep.version}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl">依赖详情</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.productionDeps.map((dep) => {
              const tech = getTechIcon(dep.name);
              return (
<Tooltip key={dep.name}>
                  <TooltipTrigger>
                    <a
                      href={dep.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <Avatar className="size-8" style={{ backgroundColor: tech.color }}>
                        <span className="text-sm">{tech.icon}</span>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate">{dep.name}</p>
                        <p className="text-[10px] text-muted-foreground">{dep.version}</p>
                      </div>
                      <IconExternalLink className="size-3 text-muted-foreground shrink-0" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{dep.version} - 点击查看 NPM</p>
                  </TooltipContent>
                </Tooltip>
                );
              })}
          </div>

          <div className="my-6">
            <h5 className="text-lg font-medium mb-4">开发依赖</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {data.developmentDeps.map((dep) => {
                const tech = getTechIcon(dep.name);
                return (
                  <Tooltip key={dep.name}>
                    <TooltipTrigger>
                      <a
                        href={dep.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <Avatar className="size-8" style={{ backgroundColor: tech.color }}>
                          <span className="text-sm">{tech.icon}</span>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium truncate">{dep.name}</p>
                          <p className="text-[10px] text-muted-foreground">{dep.version}</p>
                        </div>
                        <IconExternalLink className="size-3 text-muted-foreground shrink-0" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{dep.version} - 点击查看 NPM</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
