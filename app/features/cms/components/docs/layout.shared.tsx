import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { i18n } from "~/libs/fumadocs/i18n";

export function baseOptions(_locale = i18n.defaultLanguage): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          <span className="font-medium in-[.uwu]:hidden in-[header]:text-[15px]">RRA Document</span>
        </>
      ),
    },
  };
}
