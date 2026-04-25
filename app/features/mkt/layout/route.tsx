import { Nav } from "./components/Nav";
import { MktThemeSync } from "./components/MktThemeSync";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export function Route() {
  return (
    <>
      <MktThemeSync />
      <Nav />
    </>
  );
}
