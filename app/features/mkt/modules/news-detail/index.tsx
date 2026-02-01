import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
	return [{ title: "News Detail" }];
};

export { loader } from "./loader";

export default function Page() {
	return <Route />;
}
