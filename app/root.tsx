import { RootRoute } from "~/modules/root/route";
import { links as _links } from "~/modules/root/links";
export { handle } from "~/modules/root/handle";
export { loader } from "~/modules/root/loader";
export { ErrorBoundary } from "~/modules/root/error-boundary";

export default function Root() {
  return <RootRoute />;
}

export const links = _links;
