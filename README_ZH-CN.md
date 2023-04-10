# Remix Antd Admin

一款基于Remix / Antd / Echarts / Styled-components的管理系统，可快速进行项目初始化。

## Project experience URL

> https://remix-antd-admin.vercel.app/

## Current Remix Version

> 1.51.0

## 设计动机

Remix 的设计范式简单方便，整个应用就是一个路由器，并且是前后端打通的路由器。表单设计使得 Remix 的表单能力更加简单方便。在后台管理系统中，数据展示与数据录入，以及页面切换占据重要位置，Remix 设计似乎特贴的简单贴切。集成 Antd UI 项目能力，能快速实现具有漂亮 UI 简单的后台管理系统。

## 核心包

| 包                | 说明                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| remix             | 1.51.0（核心包）                                                            |
| antd              | 5.3.1（核心 UI 包）                                                         |
| styled-components | css-in-js 解决方案（核心 css 解决方案）                                     |
| remix-utils       | Remix 的 常用工具，例如：仅仅在服务端然组件 `<ClientOnly>` 组件（核心工具） |

## 国际化

| 国际化包                         | 说明                          |
| -------------------------------- | ----------------------------- |
| remix-i18next                    | 很容的方式翻译你的 remix 应用 |
| i18next                          |                               |
| react-i18next                    |                               |
| i18next-browser-languagedetector |                               |

### 图表库

选图表注意支持 ssr

| 图表库                 | 说明                                              |
| ---------------------- | ------------------------------------------------- |
| echarts                | 5.3.9 主要图表（考虑 Remix 需要服务端渲染等问题） |
| echarts-for-react      | 基于 React 封装 echarts 组件                      |
| react-mind             | React 脑图                                        |
| react-mindmap          | React 脑图                                        |
| react-wordcloud        | React 云词图 支持 ssr                             |
| reactflow              | 流程图                                            |
| echarts-liquidfill-ssr | 水滴图                                            |

### 裁剪工具

- [react-advanced-cropper](https://advanced-cropper.github.io/react-advanced-cropper/#mobile-cropper)

```sh
pnpm install react-advanced-cropper
```

## 优点

简单明了的路由书写范式，简单的数据获取和表单能力

- 强大的文件路由范式
- loader 获取数据
- action 处理表单数据

## 用法

使用 pnpm

```sh
# 服务器
pnpm run dev # pnpm dev
# 构建
pnpm run build # pnpm build
# 开发环境服务器
pnpm run start # pnpm start
```

### 格式化工具

```sh
"scripts": {
    "prettier": "prettier --write app/ public/locales"
},
pnpm run prettier
```

## 支持

目前作者长期处于爱发电的状态，如果本项目能够帮助到你不妨请作者喝一杯咖啡，有你的支持，开源项目将得到更好的维护，也崔进输出更加高质量的代码，当然也可以参与到此项目中成为项目的参与者，同时期望提出宝贵意见以便项目能得到更好的维护和发展。
