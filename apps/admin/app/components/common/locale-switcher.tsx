import { TranslationOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tag } from "antd";
import type { MenuProps } from "antd";
import { getLocale, locales, setLocale } from "~/paraglide/runtime.js";
import { m } from "~/paraglide/messages";
import styles from "./switcher-trigger.module.css";

type Locale = (typeof locales)[number];

const LOCALE_LABEL_KEYS: Record<Locale, () => string> = {
  en: () => m.lang_english(),
  zh: () => m.lang_chinese(),
};

const LOCALE_CODES: Record<Locale, string> = {
  en: "EN",
  zh: "ZH",
};

export function LocaleSwitcher() {
  const currentLocale = getLocale();

  const items: MenuProps["items"] = locales.map((code) => ({
    key: code,
    label: (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <Tag
          style={{
            margin: 0,
            fontSize: 11,
            lineHeight: "16px",
            padding: "0 6px",
          }}
        >
          {LOCALE_CODES[code]}
        </Tag>
        <span>{LOCALE_LABEL_KEYS[code]()}</span>
      </span>
    ),
  }));

  const onClick: MenuProps["onClick"] = ({ key }) => {
    const nextLocale = key as Locale;
    if (nextLocale === currentLocale) return;
    setLocale(nextLocale);
  };

  return (
    <Dropdown
      menu={{ items, selectedKeys: [currentLocale], onClick }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button
        type="text"
        aria-label={m.lang_aria_label()}
        icon={<TranslationOutlined style={{ fontSize: 16 }} />}
        className={styles.trigger}
      />
    </Dropdown>
  );
}
