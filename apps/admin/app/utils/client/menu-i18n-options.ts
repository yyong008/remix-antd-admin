import { m } from "~/paraglide/messages";
import { resolveMenuLabel } from "./menu-label";

/**
 * Whitelist of i18n keys that can be selected as a menu display label.
 * Mirrors `menu_*` entries in `apps/admin/messages/{en,zh}.json`. Kept explicit
 * (rather than auto-discovered from `m`) so the dropdown never accidentally
 * surfaces unrelated keys.
 */
export const MENU_LABEL_KEYS: readonly string[] = [
  "menu_dashboard",
  "menu_ai",
  "menu_chatbot",
  "menu_news",
  "menu_news_list",
  "menu_news_edit",
  "menu_blog",
  "menu_blog_list",
  "menu_blog_edit",
  "menu_blog_edit_article",
  "menu_blog_detail",
  "menu_profile",
  "menu_account",
  "menu_link",
  "menu_tools",
  "menu_mail",
  "menu_storage",
  "menu_about",
  "menu_system",
  "menu_user",
  "menu_role",
  "menu_menu",
  "menu_dept",
  "menu_dict",
  "menu_dict_item",
  "menu_config",
  "menu_monitor",
  "menu_login_log",
  "menu_operate",
  "menu_serve",
  "menu_docs",
  "menu_docs_changelog",
  "menu_docs_feedback",
] as const;

/** Plain-English verbs used as `name` for type-3 permission nodes. */
export const PERMISSION_LABEL_VALUES: readonly string[] = [
  "Read",
  "Create",
  "Update",
  "Delete",
] as const;

export type MenuI18nOption = {
  label: string;
  value: string;
};

/**
 * Build the `ProFormSelect` / `Select` option list for the menu `name` field.
 *
 * Each option's `label` is the **current locale's** translation followed by the
 * raw key in parentheses so admins can locate an entry by either text. The
 * permission verbs are appended afterwards as a separate group (resolved to
 * their literal value via `resolveMenuLabel` to stay locale-stable).
 */
export function buildMenuI18nOptions(): MenuI18nOption[] {
  const messages = m as unknown as Record<string, () => string>;
  const options: MenuI18nOption[] = MENU_LABEL_KEYS.map((key) => ({
    label: `${messages[key]()} (${key})`,
    value: key,
  }));
  for (const verb of PERMISSION_LABEL_VALUES) {
    options.push({ label: `${resolveMenuLabel(verb)} (${verb})`, value: verb });
  }
  return options;
}
