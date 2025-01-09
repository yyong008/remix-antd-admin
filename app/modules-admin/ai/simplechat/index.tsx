import { Route } from "./route";
export { meta } from "./meta";

export const loader = () => {
  return {
    ollama_url: "http://localhost:8000",
  };
};

export default function Page() {
  return <Route />;
}
