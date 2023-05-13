# Remix Antd Admin

A management system based on `Remix/Antd`, which can quickly understand the performance of Remix as a management system.

## visit

> https://remix-antd-admin.vercel.app
## Design motivation

Considering that Remix has an excellent design in the routing system, most of the background management system business is done in the routing. It may be a good choice to use Remix to complete the background management system

## Usage
- use remix cli

```sh
❯ pnpm create remix --template https://github.com/yyong008/remix-antd-admin
```

- clone project

```sh
git clone https://github.com/yyong008/remix-antd-admin.git
```

Or use `itpls` to clone, you can directly open and use

```tsx
cd your_target_dir
npx itpls --type remote
```

Then enter the content you need according to the prompt.

> itpls is a git/degit-based tool focused on template cloning.

### Install dependencies

```sh
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

## Support

- [buy-me-a-coffee](https://github.com/yyong008/buy-me-a-coffee) If you think this project has helped you, please invite the author to have a cup of coffee, thank you for your support .
