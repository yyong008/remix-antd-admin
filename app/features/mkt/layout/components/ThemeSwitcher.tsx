import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const items: MenuProps["items"] = [
    {
      key: "light",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SunOutlined style={{ fontSize: 14, color: "var(--mkt-accent)" }} />
          Light
        </span>
      ),
    },
    {
      key: "dark",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MoonOutlined style={{ fontSize: 14, color: "var(--mkt-accent-2)" }} />
          Dark
        </span>
      ),
    },
  ];

  const menu: MenuProps = {
    items,
    selectedKeys: [theme ?? "light"],
    onClick: ({ key }) => setTheme(key),
  };

  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
      <button
        type="button"
        aria-label="Theme"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid var(--mkt-border)",
          background: "var(--mkt-surface)",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
      >
        {theme === "dark" ? (
          <MoonOutlined style={{ fontSize: 18, color: "var(--mkt-accent-2)" }} />
        ) : (
          <SunOutlined style={{ fontSize: 18, color: "var(--mkt-accent)" }} />
        )}
      </button>
    </Dropdown>
  );
}
