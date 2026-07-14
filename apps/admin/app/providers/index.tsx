import { Spin } from "antd";

import { ClientOnly } from "../components/common/client-only";
import { ThemeProvider } from "../context/theme-context";
import { SessionProvider } from "../session/provider/index";
import { AppQueryProvider } from "./app-query-provider";

export { AppQueryProvider } from "./app-query-provider";
export { SessionProvider } from "../session/provider/index";
export { ThemeProvider } from "../context/theme-context";

function FullPageSpinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly fallback={<FullPageSpinner />}>
      {() => (
        <AppQueryProvider>
          <SessionProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </AppQueryProvider>
      )}
    </ClientOnly>
  );
}
