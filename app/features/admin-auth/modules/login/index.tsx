import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
	return [
		{
			title: "Sign In",
		},
	];
};

export default function Page() {
	return <Route />;
}
