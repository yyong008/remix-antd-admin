---
outline: deep
---

# 简介

[remix-antd-admin](https://github.com/yyong008/remix-antd-admin)是一个前后端全栈的管理系统。基于 Remix 和 Antd/TailwindCSS 以及 Prisma，包含 rbac 权限管理系统，内置了 remix-i18n 解决方案。

## 解决方案

- 前端版本：[remix-antd-admin](https://github.com/yyong008/remix-antd-admin)
- 全栈版本：[remix-antd-admin(fullstack)](https://github.com/yyong008/remix-antd-admin/tree/feat/fullstack) 的 **feat/full-stack**
- 桌面端版：[remix-antd-admin-electron](https://github.com/yyong008/remix-antd-admin-electron)

## 特性

## 全栈

- remix 前后端

### 业务

- admin
- Components
- login/logout

### 库

- antd
- pro-component

### 组件

- Editor
- Excel
- Table
- Error Page

- Echart
- RxJS
- Clipboard
- 客户端运行和服务端运行

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


## 请作者和喝一杯咖啡
