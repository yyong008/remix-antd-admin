import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
	return [{ title: "404" }, { name: "404", content: "Not Found" }];
};

export default function Page() {
	return <Route />;
}
