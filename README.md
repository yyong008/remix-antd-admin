# Welcome to Remix Antd Admin

A modern full-stack web solution based on React Router, React, Antd, TailwindCSS, Prisma, and RBAC.

## Feature

- 🚀 React Router for routing
- 🎉 TailwindCSS for styling
- 🔒 TypeScript by default
- 📖 Prisma for ORM
- 🔄 multi data fetch: redux/loader
- 🔐 RBAC permission management
- 🌐 remix-i18n for internationalization
- 📖 [remix-antd-admin-docs](https://remix-antd-admin-docs.vercel.app/)

## Geting Started

```sh
# git
git clone https://github.com/yyong008/remix-antd-admin.git

# or gitee
git clone https://github.com/yyong008/remix-antd-admin.git

cd remix-antd-admin

# development
pnpm run dev # open port in your browser

# production
pnpm run build
```

## Deploy

### pnpm

```ts
├── package.json
├── Dockerfile
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
└── public/        # Static assets
└── server/
    └── index.js   # server start entry file
```

### Docker

```sh
pnpm run docker:build
```

## Styling

You can control style user TailwindCSS, Antd, and other css or CSS-in-JS solutions.

## A cup of coffee.

If my project helps you, buy me a cup of coffee [💌buy-me-a-coffee💌](https://github.com/yyong008/buy-me-a-coffee)

## License

Copyright (c) 2023-present Yong-

Build with ❤️ using React Router and other open source technologies.
