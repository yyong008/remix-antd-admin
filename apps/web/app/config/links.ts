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
  return [
    {
      title: "产品",
      links: [
        { to: `/${locale}/about`, text: "关于我们" },
        { to: `/${locale}/blog`, text: "博客" },
        { to: `/${locale}/news`, text: "新闻" },
      ],
    },
    {
      title: "资源",
      links: [
        { to: "https://remix-antd-admin-docs.vercel.app/", text: "文档", isOut: true },
        { to: "https://github.com/yyong008/remix-antd-admin", text: "GitHub", isOut: true },
      ],
    },
  ];
}