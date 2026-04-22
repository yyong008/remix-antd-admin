import { href, Navigate, useParams, useSearchParams } from "react-router";

export { meta } from "~/features/admin/modules/blog/index/index";

export const handle = { breadcrumb: "博客" };

/** Canonical list URL is `/admin/blog/list`; index redirects and preserves query (filters, tab). */
export default function Page() {
  const { locale } = useParams();
  const [sp] = useSearchParams();
  const q = sp.toString();
  return (
    <Navigate to={`${href("/:locale?/admin/blog/list", { locale })}${q ? `?${q}` : ""}`} replace />
  );
}
