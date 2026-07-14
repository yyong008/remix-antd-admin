"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import * as m from "~/paraglide/messages.js";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

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
        {theme === "dark" ? (
          <IconMoon className="size-[18px]" />
        ) : theme === "light" ? (
          <IconSun className="size-[18px]" />
        ) : (
          <IconDeviceDesktop className="size-[18px]" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[60]">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">{m.theme_light()}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">{m.theme_dark()}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">{m.theme_system()}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
