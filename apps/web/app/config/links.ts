import * as m from "~/paraglide/messages.js";

interface Link {
  to: string;
  text: string;
  isOut?: boolean;
}

interface LinkSection {
  title: string;
  links: Link[];
}

export function getLinks(locale: string): LinkSection[] {
  const active = locale || "zh";
  return [
    {
      title: m.footer_section_product(),
      links: [
        { to: `/${active}/about`, text: m.footer_link_about() },
        { to: `/${active}/blog`, text: m.footer_link_blog() },
        { to: `/${active}/news`, text: m.footer_link_news() },
        { to: `/${active}/docs`, text: m.footer_link_docs() },
        { to: `/${active}/privacy`, text: m.nav_privacy() },
      ],
    },
    {
      title: m.footer_section_resources(),
      links: [
        {
          to: "https://github.com/yyong008/remix-antd-admin",
          text: m.footer_link_github(),
          isOut: true,
        },
        {
          to: "https://www.seeksaas.com",
          text: m.footer_link_seeksaas(),
          isOut: true,
        },
      ],
    },
  ];
}
