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
  description: string;
  productionDeps: AboutDependency[];
  developmentDeps: AboutDependency[];
}

const DEPENDENCY_KEYS = [
  "react-router",
  "vite",
  "antd",
  "tailwindcss",
  "drizzle-orm",
  "drizzle-kit",
  "typescript",
] as const;

const getMajorVersion = (depVersion: string | undefined): string => {
  return depVersion?.match(/\d+/)?.[0] || "";
};

const toNpmUrl = (name: string): string => {
  return /^http(s)?:/.test(name) ? name : `https://www.npmjs.com/package/${name}`;
};

const buildDescription = (pkgName: string, deps: Record<string, string>): string => {
  const techStack = DEPENDENCY_KEYS.map((key) => {
    const version = getMajorVersion(deps[key]);
    return `${key} ${version}.x`;
  }).join("、");

  return `${pkgName}是基于 ${techStack} 开发，内置了动态路由、权限验证、菜单、数据库全栈管理工具`;
};

export function useAboutData(): AboutData {
  return useMemo(() => {
    const { pkg, lastBuildTime } = __APP_INFO__;
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

    const repoUrl =
      pkg.repository?.url?.replace(/^git\+/, "").replace(/\.git$/, "") || pkg.homepage || "";
    const repoLabel = repoUrl?.replace(/^https?:\/\//, "") || "repository";

    const productionDeps: AboutDependency[] = Object.entries(pkg.dependencies || {})
      .map(([name, version]) => ({
        name,
        version: String(version),
        url: toNpmUrl(name),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const developmentDeps: AboutDependency[] = Object.entries(pkg.devDependencies || {})
      .map(([name, version]) => ({
        name,
        version: String(version),
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
      description: buildDescription(pkg.name, allDeps),
      productionDeps,
      developmentDeps,
    };
  }, []);
}
