import type { LoaderFunction } from "@vercel/remix";

// loader api
export const loader: LoaderFunction = () => {
  return new Response("Alive", { status: 200 });
};
