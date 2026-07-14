import { useMemo } from "react";

export interface AboutDependency {
  name: string;
  version: string;
  url: string;
}

export interface AboutData {
  projectName: string;
  version: string;
  lastBuildTime: string;
  repoUrl: string;
  repoLabel: string;
  homepage: string;
  techStack: Record<string, string>;
  productionDeps: AboutDependency[];
  developmentDeps: AboutDependency[];
}

export const DEPENDENCY_KEYS = [
  "react-router",
  "vite",
  "antd",
  "drizzle-orm",
  "drizzle-kit",
  "typescript",
] as const;

export const getMajorVersion = (depVersion: string | undefined): string => {
  return depVersion?.match(/\d+/)?.[0] || "";
};

const toNpmUrl = (name: string): string => {
  return /^http(s)?:/.test(name) ? name : `https://www.npmjs.com/package/${name}`;
};

const resolveVersion = (
  name: string,
  raw: string | undefined,
  catalog: Record<string, string>,
): string => {
  if (!raw) return "";
  if (raw === "catalog:") return catalog[name] ?? "catalog:";
  return raw;
};

export function useAboutData(): AboutData {
  return useMemo(() => {
    const { pkg, lastBuildTime, catalog = {} } = __APP_INFO__;
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

    const repoUrl =
      pkg.repository?.url?.replace(/^git\+/, "").replace(/\.git$/, "") || pkg.homepage || "";
    const repoLabel = repoUrl?.replace(/^https?:\/\//, "") || "repository";

    const techStack: Record<string, string> = {};
    for (const key of DEPENDENCY_KEYS) {
      techStack[key] = resolveVersion(key, allDeps[key], catalog);
    }

    const productionDeps: AboutDependency[] = Object.entries(pkg.dependencies || {})
      .map(([name, version]) => ({
        name,
        version: resolveVersion(name, version, catalog),
        url: toNpmUrl(name),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const developmentDeps: AboutDependency[] = Object.entries(pkg.devDependencies || {})
      .map(([name, version]) => ({
        name,
        version: resolveVersion(name, version, catalog),
        url: toNpmUrl(name),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      projectName: pkg.name,
      version: pkg.version,
      lastBuildTime,
      repoUrl,
      repoLabel,
      homepage: pkg.homepage || "",
      techStack,
      productionDeps,
      developmentDeps,
    };
  }, []);
}
