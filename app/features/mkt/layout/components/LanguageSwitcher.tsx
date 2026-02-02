import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Globe } from "lucide-react";

import { langs, defaultLang } from "~/config/lang";
import { SettingContext } from "~/context/setting-context";
import { useChangeLanguage } from "~/hooks/useChangeLanuage";

function getNextPath(pathname: string, nextLocale: string) {
	const segments = pathname.split("/").filter(Boolean);
	if (segments.length === 0) {
		return `/${nextLocale}`;
	}
	if (langs.includes(segments[0])) {
		segments[0] = nextLocale;
		return `/${segments.join("/")}`;
	}
	return `/${nextLocale}/${segments.join("/")}`;
}

export function LanguageSwitcher() {
	const { locale = defaultLang } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const settings = useContext(SettingContext);

	useChangeLanguage(locale);

	const handleChange = (nextLocale: string) => {
		if (nextLocale === locale) return;
		settings.setLang(nextLocale);
		navigate(getNextPath(location.pathname, nextLocale));
	};

	return (
		<div className="flex items-center rounded-full border border-[var(--mkt-border)] bg-[var(--mkt-surface)] px-2 py-1 text-sm shadow-[var(--mkt-shadow)]">
			<Globe size={16} className="mx-1 text-[var(--mkt-muted)]" />
			{langs.map((lang) => (
				<button
					key={lang}
					type="button"
					onClick={() => handleChange(lang)}
					className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
						lang === locale
							? "bg-[var(--mkt-text)] text-[var(--mkt-surface)]"
							: "text-[var(--mkt-muted)] hover:text-[var(--mkt-text)]"
					}`}
				>
					{lang}
				</button>
			))}
		</div>
	);
}
