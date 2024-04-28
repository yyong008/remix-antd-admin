<center>
  <h1>Remix Antd Admin</h1>
</center>

[Remix Antd Admin](https://github.com/yyong008/remix-antd-admin) is a full-stack management system for both front-end and back-end. Built on Remix and Antd/TailwindCSS, as well as Prisma, it includes an RBAC (Role-Based Access Control) permission management system and integrates the remix-i18n solution.

<p align="center">
  <img src="https://img.shields.io/github/stars/yyong008/remix-antd-admin.svg?style=flat-square" />
  <img src="https://img.shields.io/github/forks/yyong008/remix-antd-admin.svg?style=flat-square" />
  <img src="https://img.shields.io/github/issues/yyong008/remix-antd-admin.svg?style=flat-square" />
</p>

>💻💻💻Remix Antd Admin still in the midst of intensive development and testing...


## 语言

- [中文文档](./README_CN)

## solution

|version|address|
|---|---|
|fullstack|[remix-antd-admin](https://github.com/yyong008/remix-antd-admin) |
|frond end|[remix-antd-admin(**fe 分支**)](https://github.com/yyong008/remix-antd-admin/tree/fe)|
|electron|[remix-antd-admin-electron](https://github.com/yyong008/remix-antd-admin-electron)|

## visit

|version|visit|
|---|---|
|fullstack|[remix-antd-admin](https://remix-antd-admin.bczhp.top/)|
|front end|[remix-antd-admin(**Vercel**)](https://remix-antd-admin.vercel.app)|
|docs|[remix-antd-admin-docs](https://remix-antd-admin-docs.vercel.app/)|


### some part of project

|block|content|description|
|---|---|---|
|manager|admin|remix server and admin manager|
|user|client|public|
|server|Express.js(remix server)|server and database|

### libs

| [<img src="https://avatars.githubusercontent.com/react" alt="Node.js" width="24px" height="24px" />](https://rxjs.dev/)</br> React  |[<img src="https://avatars.githubusercontent.com/u/5658226?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://rxjs.dev/)</br> React  | [<img src="https://github.com/colinhacks/zod/raw/master/logo.svg" alt="pnpm" width="24px" height="24px" />](https://zod.dev/)</br>Zod | [<img src="https://avatars.githubusercontent.com/u/17219288?s=48&v=4" alt="Prisma" width="24px" height="24px" />](https://www.prisma.io/)</br>Prisma | [<img src="https://avatars.githubusercontent.com/u/64235328?s=48&v=4" alt="Remix" width="24px" height="24px" />](https://remix.run/)</br>Remix |  [<img src="https://avatars.githubusercontent.com/u/65625612?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://vitejs.dev/)</br> Vite |[<img src="https://avatars.githubusercontent.com/u/95747107?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://vitest.dev/)</br> Vitest|[<img src="https://avatars.githubusercontent.com/u/12101536?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://ant.design/index-cn/)</br> Antd|[<img src="https://avatars.githubusercontent.com/u/12101536?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://procomponents.ant.design/en-US)</br>ProComponent|
| --------- | --------- | --------- | --------- | --------- |---------|---------|---------|---------|
| 18.x+ | 4.x+ |8.x+| 5.x+ | 2.x+|5.x+|1.x+|5.9.x|2.6.x|

| [<img src="https://avatars.githubusercontent.com/u/67109815?s=48&v=4" alt="TailwindcCSS" width="24px" height="24px" />](https://tailwindcss.com/)</br> TailwindcCSS  | [<img src="https://avatars.githubusercontent.com/u/125564131?s=48&v=4" alt="pnpm" width="24px" height="24px" />](https://remix-development-tools.fly.dev/)</br>RemixDevTool | [<img src="https://echarts.apache.org/en/images/logo.png" alt="Prisma" width="80px" />](https://echarts.apache.org/zh/index.html)</br>Echart | [<img src="https://avatars.githubusercontent.com/u/8546082?s=48&v=4" alt="Remix" width="24px" height="24px" />](https://react.i18next.com/)</br>React i18n |  [<img src="https://avatars.githubusercontent.com/u/8908513?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://www.cypress.io/)</br> Cypress |[<img src="https://www.sqlite.org/images/sqlite370_banner.gif" alt="Sqlite" width="24px" height="24px" />](https://www.sqlite.org/)</br> Sqlite|
| --------- | --------- | --------- | --------- |---------|---------|
| 3.3.x+ | 4.0.x+| 5.0+ | 13.2.x+|13.7.x+|3.43.x+|


## features

```sh
- Admin:Login / Logout
- RBAC Permission Authentication

- global features
  - Full-stack integration, unified development for management, front-end, and back-end
  - Remix I18n Internationalization
  - CSS hybrid solution, supporting various options like TailWindCSS

- DOME:Editor
  - Rich Text Editor
  - Markdown Editor
  - JSON Editor

- DEMO:Excel
  - Export Excel
  - Upload Excel

- Fallback Page
  - $

- ... and so on
```


## Directory Structure

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

## usage

### Github

```sh
git clone https://github.com/yyong008/remix-antd-admin.git
```

### Gitee

```sh
git clone https://gitee.com/yyong008/remix-antd-admin.git
```

## start server

```sh
cd remix-antd-admin
pnpm run dev # open port in your browser
```

## Brower support

Modern browsers last 2 version

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br> Edge  | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Node.js support

| [<img src="https://avatars.githubusercontent.com/u/9950313?s=48&v=4" alt="Node.js" width="24px" height="24px" />](https://avatars.githubusercontent.com/u/9950313?s=48&v=4)</br> Node.js  | [<img src="https://avatars.githubusercontent.com/u/21320719?s=48&v=4" alt="pnpm" width="24px" height="24px" />](https://avatars.githubusercontent.com/u/21320719?s=48&v=4)</br>pnpm | [<img src="https://avatars.githubusercontent.com/u/17219288?s=48&v=4" alt="Prisma" width="24px" height="24px" />](https://avatars.githubusercontent.com/u/17219288?s=48&v=4)</br>Prisma | [<img src="https://avatars.githubusercontent.com/u/64235328?s=48&v=4" alt="Remix" width="24px" height="24px" />](https://avatars.githubusercontent.com/u/64235328?s=48&v=4)</br>Remix |
| --------- | --------- | --------- | --------- |
| 18.x+ | 8.x+| 5.x+ | 2.x+|


## A cup of coffee.

[💌buy-me-a-coffee💌](https://github.com/yyong008/buy-me-a-coffee)

## License

Copyright (c) 2023-present Magnesium-
