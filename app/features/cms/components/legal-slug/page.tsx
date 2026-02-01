import defaultMdxComponents from "fumadocs-ui/mdx";
import browserCollections from "#source/browser";

export const clientLoader = browserCollections.legal.createClientLoader({
	component({ default: Mdx }) {
		return (
			<div className="py-10">
				<div className="prose dark:prose-invert container mx-auto w-6xl py-2">
					<Mdx components={{ ...defaultMdxComponents }} />
				</div>
			</div>
		);
	},
});

/**
 * Legal component props
 */
interface LegalComponentProps {
	page: any;
}

/**
 * Legal page component
 * @param props - Component props
 * @param props.page - Legal page data
 * @returns Legal component
 */
export function LegalComponent({ page }: LegalComponentProps) {
	if (!page) {
		return <div className="mx-auto max-w-4xl py-10">Document not found.</div>;
	}
	const Content: any = clientLoader.getComponent(page.path);

	return <Content />;
}
export default LegalComponent;
