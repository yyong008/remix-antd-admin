"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { SunIcon, MoonIcon, MonitorIcon } from "~/components/icons";
import { useTheme } from "next-themes";
import * as m from "~/paraglide/messages.js";

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();

  const renderIcon = () => {
    if (!mounted) {
      return <MonitorIcon className="size-4.5" />;
    }
    const current = theme === "system" ? resolvedTheme : theme;
    if (current === "dark") return <MoonIcon className="size-4.5" />;
    if (current === "light") return <SunIcon className="size-4.5" />;
    return <MonitorIcon className="size-4.5" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-full size-7 text-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground"
            aria-label={m.theme_label()}
          />
        }
      >
        {renderIcon()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-60">
        <DropdownMenuRadioGroup value={mounted ? theme : undefined} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">{m.theme_light()}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">{m.theme_dark()}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">{m.theme_system()}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
