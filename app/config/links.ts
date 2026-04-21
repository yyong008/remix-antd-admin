export const getLinks = (lang: string) => [
  {
    title: "资源",
    links: [
      {
        text: "首页",
        to: `/${lang}`,
        isOut: false,
      },
      {
        text: "新闻",
        to: `/${lang}/news`,
        isOut: false,
      },
      {
        text: "博客",
        to: `/${lang}/blog`,
        isOut: false,
      },
      {
        text: "文档",
        to: "/docs",
        isOut: true,
      },
      {
        text: "About",
        to: `/${lang}/about`,
        isOut: false,
      },
    ],
  },
  {
    title: "技术",
    links: [
      {
        text: "React Router",
        to: "https://reactrouter.com/home",
        isOut: true,
      },
      {
        text: "Hono",
        to: "https://hono.dev/",
        isOut: true,
      },
      {
        text: "Ant Design",
        to: "https://ant.design",
        isOut: true,
      },
      {
        text: "Tailwind CSS",
        to: "https://tailwindcss.com/",
        isOut: true,
      },
      {
        text: "Drizzle",
        to: "https://orm.drizzle.team/",
        isOut: true,
      },
      {
        text: "AI SDK",
        to: "https://sdk.vercel.ai/docs",
        isOut: true,
      },
    ],
  },
  {
    title: "更多",
    links: [
      {
        text: "Github",
        to: "https://github.com/yyong008/remix-antd-admin",
        isOut: true,
      },
      {
        text: "组件库",
        to: "https://remix-antd-admin-docs.vercel.app/antd/",
        isOut: true,
      },
      {
        text: "业务示例",
        to: "https://remix-antd-admin-docs.vercel.app/feature/home.html",
        isOut: true,
      },
    ],
  },
];
