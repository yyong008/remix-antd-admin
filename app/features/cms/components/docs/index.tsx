import { useParams } from "react-router";
import { baseOptions } from "./layout.shared";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import { getMDXComponents } from "./mdx-components-blog";
import { LLMCopyButton, ViewOptions } from "./page-actions";
import browserCollections from "#source/browser";
import { useFumadocsLoader } from "fumadocs-core/source/client";

const clientLoader = browserCollections.docs.createClientLoader({
	component(
		{ toc, default: Mdx, frontmatter },
		props: { url: string; lastModified?: Date },
	) {
		return (
			<DocsPage
				toc={toc}
				tableOfContent={{
					style: "clerk",
					single: false,
				}}
				lastUpdate={new Date(props.lastModified!)}
			>
				<title>{frontmatter.title}</title>
				<meta name="description" content={frontmatter.description} />
				<h1 className="text-[1.75em] font-semibold">{frontmatter.title}</h1>
				<p className="text-lg text-fd-muted-foreground">
					{frontmatter.description}
				</p>
				<div className="flex flex-row gap-2 items-center border-b pb-4">
					<LLMCopyButton markdownUrl={`${props.url}`} />
					<ViewOptions markdownUrl={`${props.url}.mdx`} />
				</div>
				<DocsBody>
					<Mdx components={{ ...getMDXComponents() }} />
				</DocsBody>
			</DocsPage>
		);
	},
});

interface DocsImplProps {
	pageTree: object;
	path: string;
	lastModified?: Date;
}

export function DocsImpl(loaderData: DocsImplProps) {
	const { locale } = useParams();
	const { pageTree } = useFumadocsLoader({
		pageTree: loaderData.pageTree,
	});
	const Content = clientLoader.getComponent(loaderData.path);
	return (
		<DocsLayout {...baseOptions(locale)} tree={pageTree}>
			<Content url={loaderData.path} lastModified={loaderData.lastModified} />
		</DocsLayout>
	);
}
