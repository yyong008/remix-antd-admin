import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { defaultLang, langs } from "~/config/lang";
import { SettingContext } from "~/context/setting-context";
import { useChangeLanguage } from "~/hooks/useChangeLanuage";

const LANG_LABELS: Record<string, string> = {
  en: "English",
  zh: "中文",
};

function getNextPath(pathname: string, nextLocale: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${nextLocale}`;
  }
  if (langs.includes(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }
  return `/${nextLocale}/${segments.join("/")}`;
}

export function LanguageSwitcher() {
  const { locale = defaultLang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const settings = useContext(SettingContext);

  useChangeLanguage(locale as "en" | "zh");

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    settings.setLang(nextLocale);
    navigate(getNextPath(location.pathname, nextLocale));
  };

  const items: MenuProps["items"] = langs.map((lang) => ({
    key: lang,
    label: LANG_LABELS[lang] ?? lang,
  }));

  const menu: MenuProps = {
    items,
    selectedKeys: [locale],
    onClick: ({ key }) => handleChange(String(key)),
  };

  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
      <button
        type="button"
        aria-label="Language"
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
        <GlobalOutlined style={{ fontSize: 18, color: "var(--mkt-muted)" }} aria-hidden />
      </button>
    </Dropdown>
  );
}
