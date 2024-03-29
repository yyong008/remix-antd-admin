// types
import type { MetaFunction } from "@remix-run/node";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "chat",
    },
  ];
};

export default function ChatRoute() {
  return <div>ChatRoute13123</div>;
}
