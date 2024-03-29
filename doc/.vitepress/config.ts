import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "remix-antd-admin",
  description: "remix-antd-admin",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "简介", link: "/intro" },
      { text: "开始", link: "/start" },
    ],

    sidebar: [
      { text: "简介", link: "/intro" },
      { text: "开始", link: "/stack" },
      {
        text: "全栈",
        items: [
          { text: "管理端", link: "/stack" },
          { text: "restful", link: "/restful" },
        ],
      },
      {
        text: "remix",
        items: [
          { text: "路由", link: "/router" },
          { text: "布局", link: "/layout" },
          { text: "国际化", link: "/i18n" },
          { text: "环境变量", link: "/env" },
        ],
      },
      {
        text: "权限系统",
        items: [
          { text: "rbac", link: "/rbac" },
          { text: "permission", link: "/permission" },
        ],
      },
      {
        text: "数据库",
        items: [
          { text: "数据库", link: "/db" },
          { text: "prisma", link: "/prisma" },
          { text: "tailwindcss", link: "/tailwindcss" },
        ],
      },
      {
        text: "类型系统",
        items: [
          {
            text: "typescript",
            link: "/typescript",
          },
          {
            text: "prisma",
            link: "/prisma-typescript",
          },
          {
            text: "zod",
            link: "/zod",
          },
        ],
      },
      {
        text: "样式系统",
        items: [
          { text: "antd", link: "/antd" },
          { text: "tailwindcss", link: "/tailwindcss" },
          { text: "antd-icon", link: "/icon" },
          { text: "echart", link: "/chart" },
          { text: "theme", link: "/theme" },
        ],
      },
      {
        text: "工程化",
        items: [
          { text: "构建", link: "/build-deploy" },
          { text: "git", link: "/git" },
          { text: "vite", link: "/vite" },
          { text: "test", link: "/test" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/yyong008/remix-antd-admin" },
    ],
  },
});
