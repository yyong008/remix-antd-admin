import { RootComponent } from "~/modules/root/Component";
import { links as _links } from "~/modules/root/links";
export { handle } from "~/modules/root/handle";
export { loader } from "~/modules/root/loader";
export { ErrorBoundary } from "~/modules/root/ErrorBoundary";

export default function RootRoute() {
  return <RootComponent />;
}

export const links = _links;
