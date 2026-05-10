/**
 * Cloudflare Turnstile (client). Only active when `VITE_TURNSTILE_ENABLED=true`.
 * Omit or set to false in local dev to skip the widget and token requirement.
 */
export function isTurnstileEnabled(): boolean {
  return import.meta.env.VITE_TURNSTILE_ENABLED === "true";
}
