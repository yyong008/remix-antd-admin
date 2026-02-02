import { useMemo, useState } from "react";

export function Route() {
	const { pkg, lastBuildTime } = __APP_INFO__;
	const allDeps = useMemo(
		() => ({ ...pkg.dependencies, ...pkg.devDependencies }),
		[pkg.dependencies, pkg.devDependencies],
	);
	const [activeDeps, setActiveDeps] = useState<"development" | "production">(
		"development",
	);

	const getMajorVersion = (depName: string) =>
		allDeps[depName]?.match(/\d+/)?.[0] || "";
	const description = `${pkg.name}是基于 reac-router${getMajorVersion(
		"react-router",
	)}.x、
    Vite${getMajorVersion("vite")}.x、
    Antd${getMajorVersion("antd")}.x 、
    TailwindCSS${getMajorVersion("tailwindcss")}.x 、
    Drizzle${getMajorVersion("drizzle-orm")}.x 、
    drizzle-kit${getMajorVersion("drizzle-kit")}.x 、
    TypeScript${getMajorVersion(
		"typescript",
	)}.x 开发，
    内置了动态路由、权限验证、菜单、数据库全栈管理工具`;

	const depsSource =
		activeDeps === "production" ? pkg.dependencies : pkg.devDependencies;
	const depsEntries = Object.entries(depsSource || {}).sort(([a], [b]) =>
		a.localeCompare(b),
	);

	const repoUrl =
		pkg.repository?.url?.replace(/^git\+/, "").replace(/\.git$/, "") ||
		pkg.homepage;
	const repoLabel = repoUrl?.replace(/^https?:\/\//, "") || "repository";

	const toNpmUrl = (name: string) =>
		/^http(s)?:/.test(name)
			? name
			: `https://www.npmjs.com/package/${name}`;

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
			<section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
				<div className="rounded-[32px] border border-[var(--mkt-border)] bg-[var(--mkt-surface)] p-8 shadow-[var(--mkt-shadow)]">
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--mkt-muted)]">
						about
					</p>
					<h1 className="mt-3 text-3xl font-semibold">关于</h1>
					<p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[var(--mkt-muted)] md:text-base">
						{description}
					</p>
				</div>

				<div className="rounded-[32px] border border-[var(--mkt-border)] bg-[var(--mkt-surface)] p-8 shadow-[var(--mkt-shadow)]">
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--mkt-muted)]">
						project info
					</p>
					<h2 className="mt-3 text-2xl font-semibold">项目信息</h2>
					<div className="mt-6 grid gap-4 sm:grid-cols-2">
						<div className="rounded-2xl border border-[var(--mkt-border)] bg-[var(--mkt-bg)] p-4">
							<p className="text-xs uppercase tracking-[0.2em] text-[var(--mkt-muted)]">
								版本
							</p>
							<p className="mt-3 text-lg font-semibold">{pkg.version}</p>
						</div>
						<div className="rounded-2xl border border-[var(--mkt-border)] bg-[var(--mkt-bg)] p-4">
							<p className="text-xs uppercase tracking-[0.2em] text-[var(--mkt-muted)]">
								最后编译时间
							</p>
							<p className="mt-3 text-sm font-semibold">{lastBuildTime}</p>
						</div>
						<div className="rounded-2xl border border-[var(--mkt-border)] bg-[var(--mkt-bg)] p-4">
							<p className="text-xs uppercase tracking-[0.2em] text-[var(--mkt-muted)]">
								GitHub
							</p>
							<a
								href={repoUrl}
								target="_blank"
								rel="noreferrer"
								className="mt-3 inline-flex rounded-full border border-[var(--mkt-border)] px-4 py-2 text-xs font-semibold text-[var(--mkt-text)] transition hover:-translate-y-0.5 hover:shadow-[var(--mkt-shadow)]"
							>
								{repoLabel}
							</a>
						</div>
						<div className="rounded-2xl border border-[var(--mkt-border)] bg-[var(--mkt-bg)] p-4">
							<p className="text-xs uppercase tracking-[0.2em] text-[var(--mkt-muted)]">
								预览地址
							</p>
							<a
								href={pkg.homepage}
								target="_blank"
								rel="noreferrer"
								className="mt-3 inline-flex rounded-full border border-[var(--mkt-border)] px-4 py-2 text-xs font-semibold text-[var(--mkt-text)] transition hover:-translate-y-0.5 hover:shadow-[var(--mkt-shadow)]"
							>
								预览地址
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-8 rounded-[32px] border border-[var(--mkt-border)] bg-[var(--mkt-surface)] p-8 shadow-[var(--mkt-shadow)]">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--mkt-muted)]">
							dependencies
						</p>
						<h2 className="mt-2 text-2xl font-semibold">
							{activeDeps === "development" ? "开发依赖" : "生产依赖"}
						</h2>
					</div>
					<div className="flex flex-wrap gap-3">
						<button
							type="button"
							onClick={() => setActiveDeps("development")}
							className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
								activeDeps === "development"
									? "border-[var(--mkt-text)] bg-[var(--mkt-text)] text-[var(--mkt-surface)]"
									: "border-[var(--mkt-border)] text-[var(--mkt-muted)] hover:text-[var(--mkt-text)]"
							}`}
						>
							development
						</button>
						<button
							type="button"
							onClick={() => setActiveDeps("production")}
							className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
								activeDeps === "production"
									? "border-[var(--mkt-text)] bg-[var(--mkt-text)] text-[var(--mkt-surface)]"
									: "border-[var(--mkt-border)] text-[var(--mkt-muted)] hover:text-[var(--mkt-text)]"
							}`}
						>
							production
						</button>
					</div>
				</div>
				<div className="grid max-h-[520px] gap-3 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
					{depsEntries.map(([name, version]) => (
						<a
							key={name}
							href={toNpmUrl(name)}
							target="_blank"
							rel="noreferrer"
							className="group rounded-2xl border border-[var(--mkt-border)] bg-[var(--mkt-bg)] p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--mkt-shadow)]"
						>
							<p className="text-sm font-semibold">{name}</p>
							<p className="mt-2 text-xs text-[var(--mkt-muted)]">
								{version}
							</p>
							<p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[var(--mkt-muted)] group-hover:text-[var(--mkt-text)]">
								NPM
							</p>
						</a>
					))}
				</div>
			</section>
		</div>
	);
}
