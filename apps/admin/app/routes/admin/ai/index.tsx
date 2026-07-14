import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "AI Chatbot" }];
};

export default function Page() {
  return <Route />;
}
