import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
	return [{ title: "News Edit" }];
};

export default function Page() {
	return <Route />;
}
