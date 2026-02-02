import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router";
import { defaultLang } from "@/config/lang";
import { NavFooter } from "./footer";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
	{ key: "home", label: "Home", href: "" },
	{ key: "news", label: "News", href: "news" },
	{ key: "blog", label: "Blog", href: "blog" },
	{ key: "docs", label: "Docs", href: "docs" },
	{ key: "about", label: "About", href: "about" },
];

export function Nav() {
	const { locale = defaultLang } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const activePath = location.pathname;

	return (
		<div className="relative min-h-screen bg-[var(--mkt-bg)] text-[var(--mkt-text)]">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
			>
				<div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[var(--mkt-accent)] opacity-20 blur-[110px]" />
				<div className="absolute right-[-120px] top-48 h-80 w-80 rounded-full bg-[var(--mkt-accent-2)] opacity-20 blur-[120px]" />
				<div className="absolute bottom-[-200px] left-1/4 h-96 w-96 rounded-full bg-[#f4b860] opacity-20 blur-[140px]" />
			</div>

			<header className="mkt-header sticky top-0 z-30 border-b border-[var(--mkt-border)] backdrop-blur">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
					<button
						type="button"
						onClick={() => navigate(`/${locale}`)}
						className="flex items-center gap-3 text-left"
					>
						<span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--mkt-text)] text-lg font-bold text-[var(--mkt-surface)]">
							R
						</span>
						<div className="leading-tight">
							<p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--mkt-muted)]">
								Remix
							</p>
							<p className="text-lg font-semibold">Antd Admin</p>
						</div>
					</button>

					<nav className="hidden items-center gap-6 lg:flex">
						{navItems.map((item) => {
							const href = item.href ? `/${locale}/${item.href}` : `/${locale}`;
							const isActive =
								href === `/${locale}`
									? activePath === `/${locale}`
									: activePath.startsWith(href);
							return (
								<NavLink
									key={item.key}
									to={href}
									className={`text-sm font-semibold tracking-wide transition ${
										isActive
											? "text-[var(--mkt-text)]"
											: "text-[var(--mkt-muted)] hover:text-[var(--mkt-text)]"
									}`}
								>
									{item.label}
								</NavLink>
							);
						})}
					</nav>

					<div className="flex items-center gap-3">
						<LanguageSwitcher />
						<ThemeSwitcher />
						<button
							type="button"
							onClick={() => navigate(`/${locale}/admin/login`)}
							className="hidden rounded-full border border-[var(--mkt-border)] bg-[var(--mkt-text)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mkt-surface)] transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex"
						>
							Admin
						</button>
					</div>
				</div>
				<div className="flex items-center gap-4 overflow-x-auto px-6 pb-4 lg:hidden">
					{navItems.map((item) => {
						const href = item.href ? `/${locale}/${item.href}` : `/${locale}`;
						const isActive =
							href === `/${locale}`
								? activePath === `/${locale}`
								: activePath.startsWith(href);
						return (
							<NavLink
								key={item.key}
								to={href}
								className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
									isActive
										? "border-[var(--mkt-text)] bg-[var(--mkt-text)] text-[var(--mkt-surface)]"
										: "border-[var(--mkt-border)] text-[var(--mkt-muted)]"
								}`}
							>
								{item.label}
							</NavLink>
						);
					})}
				</div>
			</header>

			<main className="px-6 py-10">
				<Outlet />
			</main>
			<footer className="border-t border-[var(--mkt-border)]">
				<NavFooter />
			</footer>
		</div>
	);
}
