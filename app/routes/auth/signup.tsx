import { Route as SignupImpl } from "~/features/auth/modules/signup/route";
export { meta } from "~/features/auth/modules/signup/index";

export default function Page() {
	return <SignupImpl />;
}
