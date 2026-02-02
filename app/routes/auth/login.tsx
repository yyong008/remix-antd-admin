import { Route as LoginImpl } from "~/features/auth/modules/login/route";
export { meta } from "~/features/auth/modules/login/index";

export default function Page() {
	return <LoginImpl />;
}
