# Remix Antd Admin

一个基于 Remix/Antd/Echarts/Styled-components 的管理系统，能快速的开始一个项目。

## 目前 Remix 版本

> 1.51.0

## 设计动机

Remix's design paradigm is simple and convenient - the entire application is a router that connects the front-end and back-end. The form design makes Remix's form capabilities more straightforward and convenient. In a backend management system, data display, data entry, and page switching are crucial. Remix's design seems to be a simple and apt fit. Integrating Antd UI project capabilities allows for the rapid implementation of backend management systems with beautiful and straightforward UIs.

## Core Packages

| 包                | 说明                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| remix             | 1.51.0 (CorPackage)                                                  |
| antd              | 5.3.1 (Core UIPackage)                                               |
| styled-components | CSS-in-JS solution (Core CSS solution)                               |
| remix-utils       | Remix's common tools, such as the <ClientOnly> component (Core tool) |

## 国际化

| 国际化包                         | 说明                          |
| -------------------------------- | ----------------------------- |
| remix-i18next                    | A simple way to translate your Remix application|


### 图表库

选图表注意支持 ssr

| 图表库                 | 说明                                              |
| ---------------------- | ------------------------------------------------- |
| echarts                | 5.3.9 primary charts (consider Remix's need for server-side rendering) |
| echarts-for-react      | Echarts component encapsulated by React                     |
| react-mind             | React mind                                        |
| react-mindmap          | React mind                                        |
| react-wordcloud        | React word cloud that supports SSR                           |
| reactflow              | Flow chart                                          |
| echarts-liquidfill-ssr | Water droplet chart                                           |

### 裁剪工具

- [react-advanced-cropper](https://advanced-cropper.github.io/react-advanced-cropper/#mobile-cropper)

```sh
pnpm install react-advanced-cropper
```

## Advantages

Simple and clear routing writing paradigm, simple data retrieval and form capabilities.

- Powerful file routing paradigm
- remix loader retrieves data
- action processes form data

## 用法

Use pnpm

```sh
# server
pnpm run dev # pnpm dev
# build
pnpm run build # pnpm build
# Development environment server
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

Currently in a state of continuous fundraising. If this project helps you, please consider buying the author a cup of coffee. With your support, the project will receive better maintenance and produce higher-quality code. You can also participate in this project as a contributor and provide valuable feedback to help with its maintenance and development.
