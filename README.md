# 欢迎使用 Remix Antd Admin

一个基于 React Router、React、Antd、TailwindCSS、Prisma 和 RBAC 的现代全栈 Web 解决方案。

## 功能

- 🚀 使用 React Router 进行路由管理
- 🎉 使用 TailwindCSS 进行样式设计
- 🔒 默认使用 TypeScript
- 📖 使用 Prisma 作为 ORM
- 🔄 多种数据获取方式：redux/loader
- 🔐 RBAC 权限管理
- 🌐 使用 remix-i18n 进行国际化
- 📖 [remix-antd-admin 文档](https://remix-antd-admin-docs.vercel.app/)

## 快速开始

```sh
# git
git clone https://github.com/yyong008/remix-antd-admin.git

# 或者 gitee
git clone https://gitee.com/yyong008/remix-antd-admin.git

cd remix-antd-admin

# 开发环境
pnpm run dev # 在浏览器中打开端口

# 生产环境
pnpm run build
```

## 部署

### pnpm

```ts
├── package.json
├── Dockerfile
├── pnpm-lock.yaml
├── build/
│   ├── client/    # 静态资源
│   └── server/    # 服务器端代码
└── public/        # 静态资源
└── server/
    └── index.js   # 服务器启动入口文件
```

### Docker

```sh
pnpm run docker:build
```

## 样式

您可以使用 TailwindCSS、Antd 以及其他 CSS 或 CSS-in-JS 解决方案来控制样式。

## 一杯咖啡

如果我的项目对您有帮助，请给我买一杯咖啡 [💌buy-me-a-coffee💌](https://github.com/yyong008/buy-me-a-coffee)

## 许可证

Copyright (c) 2023-present Yong-

使用 React Router 和其他开源技术，带着 ❤️ 构建。
