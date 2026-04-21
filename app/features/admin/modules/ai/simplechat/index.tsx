import type { MetaFunction } from "react-router";

import { ai } from "@/config/ai";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Simple Chat" }];
};

export const loader = () => {
  return {
    ollama_url: ai.ollama.baseUrl,
  };
};

export default function Page() {
  return <Route />;
}
