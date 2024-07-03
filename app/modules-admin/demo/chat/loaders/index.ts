import { type LoaderFunctionArgs } from "@remix-run/node";

export async function query(args: LoaderFunctionArgs) {
  const data = {
    OLLAMA_URL: process.env.OLLAMA_URL,
  };
  return data;
}
