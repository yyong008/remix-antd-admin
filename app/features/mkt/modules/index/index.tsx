import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
	return [{ title: "Remix Antd Admin" }];
};

// export { loader } from "./loader";

export default function Page() {
	return <Route />;
}
