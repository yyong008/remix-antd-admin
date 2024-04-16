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

## 示例在线访问

|版本|地址|
|---|---|
|全栈版本访问地址|[remix-antd-admin](https://remix-antd-admin.bczhp.top/)|
|前端版本访问地址|[remix-antd-admin(**Vercel**)](https://remix-antd-admin.vercel.app)|
|文档访问地址|[remix-antd-admin-docs](https://remix-antd-admin-docs.vercel.app/)|


### 业务

>我们将业务分块

|分块|内容|详解|
|---|---|---|
|管理块|admin 块|后台管理|
|客户块|client|管理端对应的前端|
|服务块|Node.js服务|服务端渲染和数据库|

### 库


| [<img src="https://avatars.githubusercontent.com/react" alt="Node.js" width="24px" height="24px" />](https://rxjs.dev/)</br> React  | [<img src="https://github.com/colinhacks/zod/raw/master/logo.svg" alt="pnpm" width="24px" height="24px" />](https://zod.dev/)</br>Zod | [<img src="https://avatars.githubusercontent.com/u/17219288?s=48&v=4" alt="Prisma" width="24px" height="24px" />](https://www.prisma.io/)</br>Prisma | [<img src="https://avatars.githubusercontent.com/u/64235328?s=48&v=4" alt="Remix" width="24px" height="24px" />](https://remix.run/)</br>Remix |  [<img src="https://avatars.githubusercontent.com/u/65625612?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://vitejs.dev/)</br> Vite |[<img src="https://avatars.githubusercontent.com/u/95747107?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://vitest.dev/)</br> Vitest|[<img src="https://avatars.githubusercontent.com/u/12101536?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://ant.design/index-cn/)</br> Antd|[<img src="https://avatars.githubusercontent.com/u/12101536?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://procomponents.ant.design/en-US)</br>ProComponent|
| --------- | --------- | --------- | --------- |---------|---------|---------|---------|
| 18.x+ | 8.x+| 5.x+ | 2.x+|5.x+|1.x+|5.9.x|2.6.x|

| [<img src="https://avatars.githubusercontent.com/u/67109815?s=48&v=4" alt="TailwindcCSS" width="24px" height="24px" />](https://tailwindcss.com/)</br> TailwindcCSS  | [<img src="https://avatars.githubusercontent.com/u/125564131?s=48&v=4" alt="pnpm" width="24px" height="24px" />](https://remix-development-tools.fly.dev/)</br>RemixDevTool | [<img src="https://echarts.apache.org/en/images/logo.png" alt="Prisma" width="80px" />](https://echarts.apache.org/zh/index.html)</br>Echart | [<img src="https://avatars.githubusercontent.com/u/8546082?s=48&v=4" alt="Remix" width="24px" height="24px" />](https://react.i18next.com/)</br>React i18n |  [<img src="https://avatars.githubusercontent.com/u/8908513?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://www.cypress.io/)</br> Cypress |[<img src="https://www.sqlite.org/images/sqlite370_banner.gif" alt="Sqlite" width="24px" height="24px" />](https://www.sqlite.org/)</br> Sqlite|
| --------- | --------- | --------- | --------- |---------|---------|
| 3.3.x+ | 4.0.x+| 5.0+ | 13.2.x+|13.7.x+|3.43.x+|


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


## 目录结构

```tree
.
├── ./app
├── ./build.sh
├── ./CHANGELOG.md
├── ./cypress
├── ./cypress.config.ts
├── ./depoly
├── ./Dockerfile
├── ./env.d.ts
├── ./LICENSE
├── ./package.json
├── ./pnpm-lock.yaml
├── ./postcss.config.mjs
├── ./prisma
├── ./public
├── ./README.md
├── ./reset.sh
├── ./start.sh
├── ./tailwind.config.ts
├── ./tsconfig.json
├── ./vercel.json
├── ./vite.config.ts
└── ./vite-env.d.ts
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

Copyright (c) 2023-present Magnesium-
