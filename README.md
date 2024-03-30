
# 简介

[Remix Antd Admin](https://github.com/yyong008/remix-antd-admin)是一个前后端全栈的管理系统。基于 Remix 和 Antd/TailwindCSS 以及 Prisma，包含 rbac 权限管理系统，内置了 remix-i18n 解决方案。

:::tip
💻💻💻Remix Antd Admin 还在紧锣密鼓的开发和测试中...
:::

## 解决方案

- 前端版本：[remix-antd-admin(**fe 分支**)](https://github.com/yyong008/remix-antd-admin)
- 全栈版本：[remix-antd-admin(**feat/full-stack 分支**)](https://github.com/yyong008/remix-antd-admin/tree/feat/fullstack)
- 桌面端版：[remix-antd-admin-electron](https://github.com/yyong008/remix-antd-admin-electron)

## 示例在线访问

- 全栈版本访问地址：部署中
- 前端版本访问地址：[remix-antd-admin(**Vercel**)](https://remix-antd-admin.vercel.app)
- 文档访问地址：[remix-antd-admin-docs](https://remix-antd-admin-docs.vercel.app/)

## 特性

```sh
- Admin:Login / Logout
- RBAC Permission Authentication

- 全局特性
  - 全栈一体化，管理端和前端后端一体化开发
  - Remix I18n 国际化
  - CSS 混合方案，支持 TailWindCSS 等多种方案

- DOME:Editor
  - Rich Text Editor
  - Markdown Editor
  - JSON Editor

- DEMO:Excel
  - Export Excel
  - Upload Excel

- Fallback Page
  - $
```

### 业务

- admin
- Components
- login/logout

### 库

- Remix
- antd
- Pro Component
- Zod
- RxJS

## 目录结构

```tree
├── app
│   ├── components
│   ├── config
│   ├── context
│   ├── db
│   ├── entry.client.tsx
│   ├── entry.server.tsx
│   ├── hooks
│   ├── i18n
│   ├── layout
│   ├── root.tsx
│   ├── routes
│   ├── services
│   ├── styles
│   ├── __tests__
│   └── utils
├── CHANGELOG.md
├── Dockerfile
├── env.d.ts
├── LICENSE
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma
│   ├── dev.db
│   ├── dev.db-journal
│   ├── migrations
│   └── schema.prisma
├── public
│   ├── favicon.ico
│   ├── images
│   ├── locales
│   ├── logo.png
│   ├── remix.png
│   └── remix.svg
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── vite.config.ts
└── vitest.config.ts
```

## 使用

```sh
# github
git clone https://github.com/yyong008/remix-antd-admin.git

# gitee
git clone https://gitee.com/yyong008/remix-antd-admin.git
```

```sh
cd remix-antd-admin
pnpm run dev # open port in your browser
```

## 浏览器支持

Modern browsers last 2 version

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br> Edge  | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Node.js 支持

| [<img src="https://avatars.githubusercontent.com/u/9950313?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://avatars.githubusercontent.com/u/9950313?s=48&v=4)</br> Node.js  | [<img src="https://avatars.githubusercontent.com/u/21320719?s=48&v=4" alt="pnpm" width="24px" height="24px" />](https://avatars.githubusercontent.com/u/21320719?s=48&v=4)</br>pnpm | [<img src="https://avatars.githubusercontent.com/u/17219288?s=48&v=4" alt="Prisma" width="24px" height="24px" />](https://avatars.githubusercontent.com/u/17219288?s=48&v=4)</br>Prisma | [<img src="https://avatars.githubusercontent.com/u/64235328?s=48&v=4" alt="Remix" width="24px" height="24px" />](https://avatars.githubusercontent.com/u/64235328?s=48&v=4)</br>Remix |
| --------- | --------- | --------- | --------- |
| 18.x+ | 8.x+| 5.x+ | 2.x+|


## 请作者和喝一杯咖啡

[💌buy-me-a-coffee💌](https://github.com/yyong008/buy-me-a-coffee)

## License

Copyright (c) 2023-present Magnesium-
