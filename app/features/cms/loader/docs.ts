import { docsSource } from "~/libs/fumadocs/source";

export async function getDocsData({ params }: { params: { locale?: string; "*": string } }) {
  const slugs = params["*"].split("/").filter((v) => v.length > 0);
  const page = docsSource.getPage(slugs, params.locale);

  if (!page) throw new Response("Not found", { status: 404 });

  const pageTree = await docsSource.serializePageTree(docsSource.getPageTree(params.locale));

  return {
    path: page.path,
    pageTree,
    lastModified: page.data.lastModified,
  };
}
