import { ConfigProvider } from "antd";
import { useTheme } from "next-themes";
import { ThemeProvider } from "./components/ThemeProvider";
import { Nav } from "./components/Nav";
import { MktThemeSync } from "./components/MktThemeSync";
import { theme } from "antd";

function ThemeAwareNav() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Nav />
    </ConfigProvider>
  );
}

export function Route() {
  return (
    <ThemeProvider>
      <MktThemeSync />
      <ThemeAwareNav />
    </ThemeProvider>
  );
}
