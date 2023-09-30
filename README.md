# Remix Antd Admin

![](./public/images/admin.png)

A management system based on `Remix/Antd`, which can quickly understand the performance of Remix as a management system.

## visit

> https://remix-antd-admin.vercel.app

tips: maybe this: `This Serverless Function has crashed.`
## Design motivation

Considering that Remix has an excellent design in the routing system, most of the background management system business is done in the routing. It may be a good choice to use Remix to complete the background management system

## stack

- remix
- antd
- pro-components

## Usage

```sh
git clone https://github.com/yyong008/remix-antd-admin.git

# install
pnpm install

# server
pnpm run dev # pnpm dev
# Construct
pnpm run build #pnpm build
# Development environment server
pnpm run start # pnpm start
```

### Formatting tools

```json
"scripts": {
   "prettier": "prettier --write app/public/locales"
}
```

- run format

```tsx
pnpm run prettier
```

## @ant-design/icons uages

```ts
import * as _icons from '@ant-design/icons';

const { MoreOutlined } = _icons;
```

## Support

- [buy-me-a-coffee](https://github.com/yyong008/buy-me-a-coffee) If you think this project has helped you, please invite the author to have a cup of coffee, thank you for your support .
