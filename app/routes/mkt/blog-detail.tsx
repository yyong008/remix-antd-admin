import { Route as BlogDetailImpl } from "~/features/mkt/modules/blog-detail/route";
export { meta } from "~/features/mkt/modules/blog-detail/index";
export { loader } from "~/features/mkt/modules/blog-detail/index";

export default function Page() {
	return <BlogDetailImpl />;
}
