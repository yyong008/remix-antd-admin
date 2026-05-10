import { MarketingsLayout } from "./components/index";
import { AppQueryProvider } from "~/providers/app-query-provider";

export function Route() {
  return (
    <AppQueryProvider>
      <MarketingsLayout />
    </AppQueryProvider>
  );
}
