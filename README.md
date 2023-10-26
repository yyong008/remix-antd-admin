# Remix Antd Admin

![](./public/images/admin.png)

## Intro

A lightweight content management system, not limited to content management.

> https://remix-antd-admin.vercel.app

## Stack

- 🌟 Remix main framework
- 🏰 Ant Design design system
- 🚀 RxJS has significant advantages in handling complex calculations
- 📊 Echarts chart system and SSR (Server-Side Rendering)
- 🌍 Internationalization support with i18next, react-i18next, and remix-i18next
- 💡 Atomic support with Tailwind CSS
- 🧰 Developer tools support with remix-development-tools
- 🧪 Component testing with Vitest

## Quickstart

```sh
git clone https://github.com/yyong008/remix-antd-admin.git
# or
git clone https://gitee.com/yyong008/remix-antd-admin.git

pnpm install # install deps

pnpm run dev # pnpm dev

pnpm run build #pnpm build

pnpm run start # pnpm start
```

## Client only

```tsx
<html lang={params.lang}>
  <body>
    <ClientOnly fallback={<Loading />}>{() => <Outlet />}</ClientOnly>
  </body>
</html>
```

## Code layout

- `/app/hooks/**` define custom hooks
- `/app/layout/**` define main layout

## @ant-design/icons uages

use in client only mode

```ts
import * as _icons from '@ant-design/icons';

const { MoreOutlined } = _icons;
```

## API checkhealth

```ts
export const loader: LoaderFunction = () => {
  return new Response("Alive", { status: 200 });
};
```

visit: `http://localhost:<your_port>/checkhealth`, if get `Alive`, this api server is alive。

## Support

- [buy-me-a-coffee](https://github.com/yyong008/buy-me-a-coffee) If you think this project has helped you, please invite the author to have a cup of coffee, thank you for your support .
