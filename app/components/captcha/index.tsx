import { Turnstile } from "@marsidev/react-turnstile";

import { isTurnstileEnabled } from "~/config/turnstile";
import { useSiteDarkMode } from "~/hooks/useSiteDarkMode";

/**
 * @see https://developers.cloudflare.com/turnstile/community-resources/
 * @see https://github.com/marsidev/react-turnstile
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
  const isDark = useSiteDarkMode();

  if (!isTurnstileEnabled()) {
    return null;
  }

  return (
    <Turnstile
      className={className}
      onSuccess={handleSuccess}
      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
      options={{
        theme: isDark ? "dark" : "light",
        language: "en",
        size: size,
      }}
    />
  );
}
