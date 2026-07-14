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
      ],
    },
    {
      title: m.footer_section_resources(),
      links: [
        {
          to: "https://remix-antd-admin-docs.vercel.app/",
          text: m.footer_link_docs(),
          isOut: true,
        },
        {
          to: "https://github.com/yyong008/remix-antd-admin",
          text: m.footer_link_github(),
          isOut: true,
        },
      ],
    },
  ];
}
