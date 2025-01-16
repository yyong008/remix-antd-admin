import { type LoaderFunctionArgs } from "react-router";

export async function query(args: LoaderFunctionArgs) {
  const data = {
    OLLAMA_URL: process.env.OLLAMA_URL,
  };
  return data;
}
