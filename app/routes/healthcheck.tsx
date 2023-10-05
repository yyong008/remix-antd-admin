import type { LoaderFunction } from "@vercel/remix"

export const loader: LoaderFunction = () => {
  return new Response("Alive", { status: 200 })
}