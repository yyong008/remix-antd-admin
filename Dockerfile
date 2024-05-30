FROM node:20.11.1-alpine3.19 AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

ARG NODE_ENV
ARG DATABASE_URL
ARG SESSION_SECRET
ARG TINYMCE_KEY
ARG PRESENTATION_MODE
ARG PORT
ARG OLLAMA_URL

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV SESSION_SECRET=${SESSION_SECRET}
ENV TINYMCE_KEY=${TINYMCE_KEY}
ENV PRESENTATION_MODE=${PRESENTATION_MODE}
ENV PORT={PROT}
ENV OLLAMA_URL={OLLAMA_URL}

RUN npm config set registry https://registry.npmmirror.com \
  && npm install -g pnpm \
  && pnpm install --prod=false

FROM dependencies AS build

COPY . .

RUN npx prisma generate

RUN NODE_OPTIONS=--max-old-space-size=4096 pnpm run build

# RUN pnpm prune --prod

FROM node:20.11.1-alpine3.19 AS runtime

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com \
  && npm install -g pnpm

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/server ./server
COPY --from=build /app/build ./build
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./

ARG NODE_ENV
ARG DATABASE_URL
ARG SESSION_SECRET
ARG TINYMCE_KEY
ARG PRESENTATION_MODE
ARG PORT
ARG OLLAMA_URL

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV SESSION_SECRET=${SESSION_SECRET}
ENV TINYMCE_KEY=${TINYMCE_KEY}
ENV PRESENTATION_MODE=${PRESENTATION_MODE}
ENV PORT={PROT}
ENV OLLAMA_URL={OLLAMA_URL}

EXPOSE 3000

CMD ["pnpm", "run", "start"]
