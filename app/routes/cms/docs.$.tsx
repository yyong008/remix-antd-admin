import type { Route } from "./+types/docs.$";

import { DocsImpl } from "~/features/cms/components/docs";
import { getDocsData } from "~/features/cms/loader/docs";

export const loader = async ({ params }: Route.LoaderArgs) => {
	const result = await getDocsData({ params });
	return result;
};

export default function DocsPage({ loaderData }: Route.ComponentProps) {
	const { pageTree, path, lastModified } = loaderData;
	return (
		<DocsImpl pageTree={pageTree} path={path} lastModified={lastModified} />
	);
}
