import { Route as NewsDetailImpl } from "~/features/mkt/modules/news-detail/route";
export { meta } from "~/features/mkt/modules/news-detail/index";
export { loader } from "~/features/mkt/modules/news-detail/index";

export default function Page() {
	return <NewsDetailImpl />;
}
