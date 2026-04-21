import type { MenuFlatRow } from "~/utils/menu-tree";

/**
 * Nav/sidebar entries that must not be returned to the client (legacy rows may still exist in DB).
 * News category admin page was removed; category data is still used via API in forms.
 * Blog category/tag standalone routes were removed; filters + modals live on the blog list page.
 */
export function isExcludedFromAdminNavMenu(m: MenuFlatRow): boolean {
  if (m.id === "m-news-category") return true;
  if (m.id === "m-blog-category" || m.id === "m-blog-tag") return true;
  const pf = (m.path_file ?? "").trim().replace(/^\/+/, "").toLowerCase();
  if (pf === "admin/news/category") return true;
  if (pf === "admin/blog/category" || pf === "admin/blog/tag") return true;
  const p = (m.path ?? "").trim().toLowerCase();
  if (p === "/news/category" || p.endsWith("/news/category")) return true;
  if (p === "/blog/category" || p.endsWith("/blog/category")) return true;
  if (p === "/blog/tag" || p.endsWith("/blog/tag")) return true;
  return false;
}

export function filterExcludedAdminNavMenus(items: MenuFlatRow[]): MenuFlatRow[] {
  return items.filter((row) => !isExcludedFromAdminNavMenu(row));
}
