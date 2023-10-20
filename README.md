# Remix Antd Admin

![](./public/images/admin.png)

A management system based on `Remix/Antd/...`, which can quickly understand the performance of Remix as a management system.

> https://remix-antd-admin.vercel.app

tips: maybe this: `This Serverless Function has crashed.`

## Design motivation

Considering that Remix has an excellent design in the routing system, most of the background management system business is done in the routing. It may be a good choice to use Remix to complete the background management system. now, I currently lean more towards front-end development.

## stack

| pkg                             | version           | desc                           |
| ------------------------------- | ----------------- | ------------------------------ |
| remix                           | v2.0.1            | latest Remix                   |
| tailwindcss                     | latest Remix      | css                            |
| antd/@ant-design/pro-components | v5.9.4            | Antd UI                        |
| echarts                         | v5.4.3            | chart lib with ssr             |
| i18next                         | v23.5.1           | i18n                           |
| remix-development-tools         | v3.0.3            | Remix DevTool (in development) |
| remix-i18next                   | v5.0.0(no update) | remix i18n ()                  |
| RxJS                            | latest Remix      | For complex calculations.      |

## Usage

```sh
# clone the project
git clone https://github.com/yyong008/remix-antd-admin.git
# or gitee
git clone https://gitee.com/yyong008/remix-antd-admin.git

# install deps
pnpm install

# start local server
pnpm run dev # pnpm dev

# build project for productin
pnpm run build #pnpm build

# start in production
pnpm run start # pnpm start
```

## styles

- css
- cssModule
- tailwindcss

## client only

```tsx
    <html lang={params.lang}>
      <body>
        <ClientOnly fallback={<Loading />}>{() => <Outlet />}</ClientOnly>
      </body>
    </html>
```

## custom hooks

`/app/hooks/**` dir define custom hooks

## layout

`/app/layout/**` dir define main layout

## @ant-design/icons uages

use in client only mode

```ts
import * as _icons from '@ant-design/icons';

const { MoreOutlined } = _icons;
```

## api checkhealth

```ts
export const loader: LoaderFunction = () => {
  return new Response("Alive", { status: 200 });
};
```

visit: `http://localhost:<your_port>/checkhealth`, if get `Alive`, this api server is alive。

## Support

- [buy-me-a-coffee](https://github.com/yyong008/buy-me-a-coffee) If you think this project has helped you, please invite the author to have a cup of coffee, thank you for your support .
