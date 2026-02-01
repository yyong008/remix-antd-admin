import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
	return [{ title: "blog-result" }];
};

export default function Page() {
	return <Route />;
}
