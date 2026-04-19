import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Simple Chat" }];
};

export const loader = () => {
  return {
    ollama_url: "http://localhost:8000",
  };
};

export default function Page() {
  return <Route />;
}
