import { m } from "~/paraglide/messages";

/**
 * Resolve a menu's `name` (i18n key) to a localized display string.
 *
 * Menu rows in `sys_menu.name` carry either an `m.*` key (e.g. `menu_dashboard`)
 * or a plain-English verb for type-3 permission nodes (`Read`, `Create`, ...).
 * When the key is unknown to the i18n runtime, the original `name` is returned
 * as a fallback so legacy / permission labels render verbatim.
 */
export function resolveMenuLabel(name: string | null | undefined): string {
  if (!name) return "";
  const fn = (m as unknown as Record<string, (() => string) | undefined>)[name];
  if (typeof fn === "function") {
    try {
      return fn();
    } catch {
      return name;
    }
  }
  return name;
}
