import type { Route } from "./+types/docs.$";

import { DocsImpl } from "~/features/cms/components/docs";
import { getDocsData } from "~/features/cms/loader/docs";



export const loader = async ({ params }: Route.LoaderArgs) => {
  console.log("docs.$.tsx loader", params);
  const result = await getDocsData({ params });
  console.log("docs.$.tsx loader result", result);
  return result;
};


export default function DocsPage({ loaderData }: Route.ComponentProps) {
  const { pageTree, path, lastModified } = loaderData;
  return <DocsImpl pageTree={pageTree} path={path} lastModified={lastModified} />;
}
