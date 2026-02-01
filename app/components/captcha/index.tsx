import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";

/**
 * @see https://developers.cloudflare.com/turnstile/community-resources/
 * @see https://github.com/marsidev/react-turnstile
 *
 */

export function TurnstileWidget({
	handleSuccess,
	className,
	size = "flexible",
}: {
	handleSuccess: (token: string) => void;
	className?: string;
	size?: "normal" | "compact" | "flexible" | "invisible";
}) {
	const { theme } = useTheme();

	return (
		<Turnstile
			className={className}
			onSuccess={handleSuccess}
			siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
			options={{
				theme:
					theme === "system" ? "auto" : theme === "dark" ? "dark" : "light",
				language: "en",
				size: size,
			}}
		/>
	);
}
