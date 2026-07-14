import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { i18n } from "~/lib/i18n";
import { uiTranslations } from "fumadocs-ui/i18n";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: {
      displayName: "English",
    },
    zh: {
      displayName: "中文",
    },
  });
export function baseOptions(_locale?: string): BaseLayoutProps {
  return {
    // different props based on `locale`
  };
}
