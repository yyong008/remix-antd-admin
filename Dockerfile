# 使用 Node.js 官方镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /data/webroot/app

# 复制 package.json 和 pnpm-lock.yaml 到工作目录
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm 依赖
RUN npm install -g pnpm && pnpm install

# 复制应用程序代码到工作目录
COPY . .

RUN npm run build

# 暴露应用程序的端口（根据你的应用程序配置）
EXPOSE 3003

# 启动应用程序
CMD ["PORT=3003", "pnpm", "run", "start"]
