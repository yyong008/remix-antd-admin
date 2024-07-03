import { Route } from "./menu/route";
export { meta } from "./menu/meta";
export { loader } from "./menu/loader";
export { action } from "./menu/action";

export default function Page() {
  return <Route />;
}
