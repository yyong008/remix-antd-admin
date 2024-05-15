import { type LoaderFunctionArgs, json } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = {
    OLLAMA_URL: process.env.OLLAMA_URL,
  };
  return json({
    data,
  });
};
