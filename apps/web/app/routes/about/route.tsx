import type { LoaderFunctionArgs } from "react-router";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { IconExternalLink, IconBrandGithub, IconWorld } from "@tabler/icons-react";
import * as m from "~/paraglide/messages.js";

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

function toNpmUrl(name: string) {
  return /^http(s)?:/.test(name) ? name : `https://www.npmjs.com/package/${name}`;
}

type DepEntry = [string, string];

export function Route() {
  const { pkg, lastBuildTime } = __APP_INFO__;
  const deps = Object.entries(pkg.dependencies ?? {}) as DepEntry[];
  const devDeps = Object.entries(pkg.devDependencies ?? {}) as DepEntry[];
  const repoUrl = pkg.repository.url.replace(/^git\+/, "").replace(/\.git$/, "");

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden border-0" style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 12,
      }}>
        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {m.about_project_name()}
              </h1>
              <p className="text-white/85 text-base leading-relaxed mb-6">
                {m.about_project_description()}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <IconBrandGithub className="size-4" />
                  {m.about_link_github()}
                </a>
                <a
                  href={pkg.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <IconWorld className="size-4" />
                  {m.about_link_preview()}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
              <StatCard value={pkg.version} label={m.about_label_version()} />
              <StatCard value={lastBuildTime} label={m.about_label_last_build()} />
              <StatCard value={String(deps.length)} label={m.about_section_deps()} />
              <StatCard value={String(devDeps.length)} label={m.about_section_dev_deps()} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="rounded-xl">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{m.about_section_stack()}</h2>
          </div>
          <div className="space-y-1">
            {[
              "react",
              "react-router",
              "vite",
              "hono",
              "tailwindcss",
              "drizzle-orm",
              "better-auth",
              "typescript",
            ].map((name) => {
              const pkg = deps.find(([n]) => n === name || n === `@${name}` || n.startsWith(`${name}/`) || n.startsWith(`@${name}/`));
              if (!pkg) return null;
              return (
                <a
                  key={name}
                  href={toNpmUrl(pkg[0])}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                >
                  <code className="text-sm font-mono flex-1">{pkg[0]}</code>
                  <IconExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dependencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardContent className="p-5">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              {m.about_section_deps()}
              <Badge variant="secondary">{deps.length}</Badge>
            </h3>
            <div className="space-y-1">
              {deps
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([name]) => (
                  <a
                    key={name}
                    href={toNpmUrl(name)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <code className="text-xs font-mono flex-1 truncate">{name}</code>
                    <IconExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardContent className="p-5">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              {m.about_section_dev_deps()}
              <Badge variant="secondary">{devDeps.length}</Badge>
            </h3>
            <div className="space-y-1">
              {devDeps
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([name]) => (
                  <a
                    key={name}
                    href={toNpmUrl(name)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <code className="text-xs font-mono flex-1 truncate">{name}</code>
                    <IconExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl p-4 text-center backdrop-blur-sm min-w-[100px]" style={{ background: "rgba(255,255,255,0.1)" }}>
      <p className="text-white/70 text-[10px] uppercase tracking-wider">{label}</p>
      <p className="text-white text-lg font-semibold mt-1 truncate">{value}</p>
    </div>
  );
}
