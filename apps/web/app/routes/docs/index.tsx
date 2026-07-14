import type { Route } from "./+types/index";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "~/lib/source";
import type * as PageTree from "fumadocs-core/page-tree";
import { baseOptions } from "~/lib/layout.shared";

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = (params["*"] ?? "").split("/").filter((v) => v.length > 0);
  const page = source.getPage(slugs, params.locale);
  if (!page) throw new Response("Not found", { status: 404 });

  return {
    path: page.path,
    tree: source.getPageTree(params.locale),
  };
}

export default function Page({ loaderData, params }: Route.ComponentProps) {
  const { tree } = loaderData;

  return <DocsLayout {...baseOptions(params.locale)} tree={tree as PageTree.Root}></DocsLayout>;
}
