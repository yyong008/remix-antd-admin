import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
	return [{ title: "System-Meta" }];
};

export default function Page() {
	return <Route />;
}
