# Remix Antd Admin

一款基于 `Remix/Antd` 的管理系统，可快速进行了解 Remix 作为管理系统时的表现。

## 访问地址

> https://github.com/yyong008/remix-antd-admin
## 设计动机

考虑到 Remix 在路由系统的设计非常优秀，后台管理系统业务大部分在路由中完成的。使用 Remix 完成后台管理系统可能是一个不错的选择

## 用法

- clone 项目

```sh
git clone https://github.com/yyong008/remix-antd-admin.git
```

或者使用 `itpls` 来克隆，能直接打开使用

```tsx
cd your_target_dir
npx itpls --type remote 
```

然后根据提示输入您需要的内容即可。

> itpls 是一个基于 git/degit，专注于模板克隆的工具。

### 安装依赖

```sh
# 服务器
pnpm run dev # pnpm dev
# 构建
pnpm run build # pnpm build
# 开发环境服务器
pnpm run start # pnpm start
```

### 格式化工具

```json
"scripts": {
  "prettier": "prettier --write app/ public/locales"
}
```

- 运行格式化

```tsx
pnpm run prettier
```

## 支持作者

- [buy-me-a-coffee](https://github.com/yyong008/buy-me-a-coffee) 如果您觉的此项目帮助到了您，不妨请作者喝一杯咖啡，谢谢您的支持。
