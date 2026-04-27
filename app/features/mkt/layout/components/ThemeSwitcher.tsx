import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { SunOutlined, MoonOutlined, DesktopOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "~/context/theme-context";
import type { MktThemeMode } from "~/utils/mkt-theme";
import styles from "./ThemeSwitch.module.css";

export function ThemeSwitcher() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const items: MenuProps["items"] = [
    {
      key: "light",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SunOutlined style={{ fontSize: 14, color: "var(--ant-color-primary)" }} />
          Light
        </span>
      ),
    },
    {
      key: "dark",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MoonOutlined style={{ fontSize: 14, color: "var(--ant-color-primary)" }} />
          Dark
        </span>
      ),
    },
    {
      key: "system",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DesktopOutlined style={{ fontSize: 14, color: "var(--ant-color-text-secondary)" }} />
          System
        </span>
      ),
    },
  ];

  const menu: MenuProps = {
    items,
    selectedKeys: [themeMode],
    onClick: ({ key }) => setThemeMode(key as MktThemeMode),
  };
  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
      <button type="button" aria-label="Theme" className={styles.trigger}>
        {themeMode === "dark" ? (
          <MoonOutlined className={`${styles.icon} ${styles.iconDark}`} />
        ) : themeMode === "light" ? (
          <SunOutlined className={`${styles.icon} ${styles.iconLight}`} />
        ) : (
          <DesktopOutlined className={`${styles.icon} ${styles.iconDark}`} />
        )}
      </button>
    </Dropdown>
  );
}
