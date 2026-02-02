import { Route as AboutImpl } from "~/features/mkt/modules/about/route";
export { meta } from "~/features/mkt/modules/about/index";
export { loader } from "~/features/mkt/modules/about/index";

export default function Page() {
	return <AboutImpl />;
}
