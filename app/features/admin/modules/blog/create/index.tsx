import type { MetaFunction } from "react-router";
import { Route } from "~/features/admin/modules/blog/create/route";

export const meta: MetaFunction = () => {
	return [{ title: "Blog Create" }];
};

export default function Page() {
	return <Route />;
}
