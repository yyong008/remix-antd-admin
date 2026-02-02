import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "mkt-theme";

type ThemeMode = "light" | "dark";

function applyTheme(mode: ThemeMode) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	root.classList.toggle("theme-dark", mode === "dark");
	root.dataset.theme = mode;
}

export function ThemeSwitcher() {
	const [mode, setMode] = useState<ThemeMode>("light");

	useEffect(() => {
		if (typeof window === "undefined") return;
		const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
		const preferred = stored ?? "light";
		setMode(preferred);
		applyTheme(preferred);
	}, []);

	const toggle = () => {
		const next = mode === "dark" ? "light" : "dark";
		setMode(next);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(STORAGE_KEY, next);
		}
		applyTheme(next);
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Toggle theme"
			className="inline-flex items-center gap-2 rounded-full border border-[var(--mkt-border)] bg-[var(--mkt-surface)] px-3 py-2 text-sm font-medium text-[var(--mkt-text)] shadow-[var(--mkt-shadow)] transition hover:-translate-y-0.5 hover:shadow-lg"
		>
			{mode === "dark" ? (
				<Moon size={16} className="text-[var(--mkt-accent-2)]" />
			) : (
				<Sun size={16} className="text-[var(--mkt-accent)]" />
			)}
			<span className="hidden sm:inline">
				{mode === "dark" ? "Dark" : "Light"}
			</span>
		</button>
	);
}
