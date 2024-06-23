import { Route } from "~/modules/admin/blog/index/route";
export { meta } from "~/modules/admin/blog/index/meta";
export { loader } from "~/modules/admin/blog/index/loader";
export { action } from "~/modules/admin/blog/index/action";

export default function Page() {
  return <Route />;
}
