import type { InitOptions } from "i18next";

export default {
  supportedLngs: ["en-US", "zh-CN"],
  fallbackLng: "zh-CN",
  defaultNS: "common",
  react: { useSuspense: false },
} satisfies InitOptions;
