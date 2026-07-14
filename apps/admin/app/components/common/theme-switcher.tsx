import { DesktopOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useContext } from "react";
import { ThemeContext } from "~/context/theme-context";
import type { MktThemeMode } from "~/utils/mkt-theme";
import { m } from "~/paraglide/messages";
import styles from "./switcher-trigger.module.css";

const MENU_ICON_STYLE: React.CSSProperties = { fontSize: 14 };

export function ThemeSwitcher() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const items: MenuProps["items"] = [
    {
      key: "light",
      label: (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <SunOutlined style={MENU_ICON_STYLE} />
          <span>{m.theme_light()}</span>
        </span>
      ),
    },
    {
      key: "dark",
      label: (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <MoonOutlined style={MENU_ICON_STYLE} />
          <span>{m.theme_dark()}</span>
        </span>
      ),
    },
    {
      key: "system",
      label: (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <DesktopOutlined style={MENU_ICON_STYLE} />
          <span>{m.theme_system()}</span>
        </span>
      ),
    },
  ];

  const menu: MenuProps = {
    items,
    selectedKeys: [themeMode],
    onClick: ({ key }) => setThemeMode(key as MktThemeMode),
  };

  const triggerIcon =
    themeMode === "dark" ? (
      <MoonOutlined style={{ fontSize: 16 }} />
    ) : themeMode === "light" ? (
      <SunOutlined style={{ fontSize: 16 }} />
    ) : (
      <DesktopOutlined style={{ fontSize: 16 }} />
    );

  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
      <Button
        type="text"
        aria-label={m.theme_aria_label()}
        icon={triggerIcon}
        className={styles.trigger}
      />
    </Dropdown>
  );
}
