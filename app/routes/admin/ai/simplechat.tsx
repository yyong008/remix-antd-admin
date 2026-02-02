import { Route as SimplechatImpl } from "~/features/admin/modules/ai/simplechat/route";
export { meta } from "~/features/admin/modules/ai/simplechat/index";
export { loader } from "~/features/admin/modules/ai/simplechat/index";

export default function Page() {
	return <SimplechatImpl />;
}
