import { RootComponent } from "~/features/root/Component";
import { links as _links } from "~/features/root/links";
export { handle } from "~/features/root/handle";
export { loader } from "~/features/root/loader";
export { ErrorBoundary } from "~/features/root/ErrorBoundary";

export default function RootRoute() {
  return <RootComponent />;
}

export const links = _links;
