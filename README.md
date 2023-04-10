# Remix Antd Admin

A management system based on `Remix`/`Antd`/`Echarts`/`Styled-components` that enables quick project initialization.

## Current Remix Version

> 1.51.0

## Motivation

Remix's design paradigm is simple and convenient - the entire application is a router that connects the front-end and back-end. The form design makes Remix's form capabilities more straightforward and convenient. In a backend management system, data display, data entry, and page switching are crucial. Remix's design seems to be a simple and apt fit. Integrating Antd UI project capabilities allows for the rapid implementation of backend management systems with beautiful and straightforward UIs.

## Core Packages

| Package           | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| remix             | 1.51.0 (CorPackage)                                                    |
| antd              | 5.3.1 (Core UIPackage)                                                 |
| styled-components | CSS-in-JS solution (Core CSS solution)                                 |
| remix-utils       | Remix's common tools, such as the `<ClientOnly>` component (Core tool) |

## Chart Libraries

| Internationalization Package | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| remix-i18next                | A simple way to translate your Remix application |

### Chart Libraries

Chart selection should consider support for SSR.

| Chart Library          | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| echarts                | 5.3.9 primary charts (consider Remix's need for server-side rendering) |
| echarts-for-react      | Echarts component encapsulated by React                                |
| react-mind             | React mind                                                             |
| react-mindmap          | React mind                                                             |
| react-wordcloud        | React word cloud that supports SSR                                     |
| reactflow              | Flow chart                                                             |
| echarts-liquidfill-ssr | Water droplet chart                                                    |

### Cropping Tool

- [react-advanced-cropper](https://advanced-cropper.github.io/react-advanced-cropper/#mobile-cropper)

```sh
pnpm install react-advanced-cropper
```

## Advantages

Simple and clear routing writing paradigm, simple data retrieval and form capabilities.

- Powerful file routing paradigm
- remix loader retrieves data
- action processes form data

## Usage

Use pnpm

```sh
# server
pnpm run dev # pnpm dev
# build
pnpm run build # pnpm build
# Development environment server
pnpm run start # pnpm start
```

### Formatting Tool

```sh
"scripts": {
    "prettier": "prettier --write app/ public/locales"
},
pnpm run prettier
```

## Support

Currently in a state of continuous fundraising. If this project helps you, please consider buying the author a cup of coffee. With your support, the project will receive better maintenance and produce higher-quality code. You can also participate in this project as a contributor and provide valuable feedback to help with its maintenance and development.
