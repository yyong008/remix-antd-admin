FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com \
  && npm install -g pnpm \
  && pnpm install \
  && NODE_OPTIONS=--max-old-space-size=4096 pnpm run build \
  && rm -rf node_modules/.cache \
  && apk add sqlite \
  && ./start.sh

EXPOSE 3333

CMD ["pnpm", "run", "start"]
