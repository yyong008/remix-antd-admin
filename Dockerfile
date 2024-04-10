FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com \
  && npm install -g pnpm \
  && pnpm install \
  && NODE_OPTIONS=--max-old-space-size=4096 pnpm run build \
  && rm -rf node_modules/.cache \
  && apk add sqlite \
  && npx prisma init --datasource-provider sqlite \
  && cp ./depoly/schema.prisma ./prisma/schema.prisma \
  && npx prisma migrate dev --name init \
  && sqlite3 ./prisma/dev.db < ./depoly/seed.sql \
  && echo "👌数据初始化已完成"

EXPOSE 3000
EXPOSE 3333

CMD ["pnpm", "run", "start"]
