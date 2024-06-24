<center>
  <h1>Remix Antd Admin</h1>
</center>

[Remix Antd Admin](https://github.com/yyong008/remix-antd-admin) 是一个前后端全栈的管理系统。基于 Remix 和 Antd/TailwindCSS 以及 Prisma，包含 rbac 权限管理系统，内置了 remix-i18n 解决方案。

<p align="center">
  <img src="https://img.shields.io/github/stars/yyong008/remix-antd-admin.svg?style=flat-square" />
  <img src="https://img.shields.io/github/forks/yyong008/remix-antd-admin.svg?style=flat-square" />
  <img src="https://img.shields.io/github/issues/yyong008/remix-antd-admin.svg?style=flat-square" />
</p>

>💻💻💻Remix Antd Admin 还在紧锣密鼓的开发和测试中...


## 语言

- [英文文档](./README)

## 解决方案

|版本|地址|
|---|---|
|全栈版本|[remix-antd-admin](https://github.com/yyong008/remix-antd-admin) |
|前端版本|[remix-antd-admin(**fe 分支**)](https://github.com/yyong008/remix-antd-admin/tree/fe)|
|桌面端版|[remix-antd-admin-electron](https://github.com/yyong008/remix-antd-admin-electron)|
|全栈版本访问地址|[remix-antd-admin](https://remix-antd-admin.bczhp.top/)|
|前端版本访问地址|[remix-antd-admin(**Vercel**)](https://remix-antd-admin.vercel.app)|
|文档访问地址|[remix-antd-admin-docs](https://remix-antd-admin-docs.vercel.app/)|


## 设计特点

本项目在 Remix 中完成前端端分离, 但实际是一个项目，在更加需要 SSR 的前端使用 Remix (data flow), 在管理端使用（Restful API）

### 前端

多为展示数据显然，需要良好的 SEO 能力，使用服务端渲染压力小。

- 基于 Remix SSR 数据流，loader -> Component -> action -> loader 的闭环。这种数据流不需要使用使用三库发起请求。

### 管理端

有较多库支持，渲染任务繁重，采用与 API 进行 json 交互，将渲染任务交给客户端。

- 基于 antd + tailwindcss
- 自定义 API（Remix 的 action/loader 中处理 GET/POST/PUT/DELETE）。
- redux-toolkit 完成数据缓存和获取。

### 后端

- 基于 Remix + Express 后端。
- API 基于 action/loader 进行 Restful 分发。
- 可以通过 express 添加全局任务（可能用不上）
- 具备基础功利系统基础功能。

### 基础业务

- 系统管理
- AI 聊天（ollama）
- 博客
- 新闻
- 链接
- ...

## 目录结构

```tree
remix-antd-admin
├── CHANGELOG.md
├── Dockerfile
├── LICENSE
├── README.md
├── README_CN.md
├── app
│   ├── __mock__
│   ├── __tests__
│   ├── components
│   ├── config
│   ├── constants
│   ├── context
│   ├── decorators
│   ├── entry.client.tsx
│   ├── entry.server.tsx
│   ├── hooks
│   ├── lib
│   ├── modules
│   ├── root.tsx
│   ├── routes
│   ├── schema
│   ├── services
│   ├── store-provider.tsx
│   ├── styles
│   ├── types
│   └── utils
├── cypress
├── cypress.config.ts
├── env.d.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma
│   └── schema
├── public
├── tailwind.config.ts
├── todo.md
├── tsconfig.json
├── vite-env.d.ts
├── vite.config.ts
└── vitest.config.ts
```

## 使用

### Github

```sh
git clone https://github.com/yyong008/remix-antd-admin.git
```

### Gitee

```sh
git clone https://gitee.com/yyong008/remix-antd-admin.git
```

## 启动服务

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

Copyright (c) 2023-present Yong-
