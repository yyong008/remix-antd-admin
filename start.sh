#!/bin/bash

pnpm remove prisma @prisma/client

# rm -r node_modules
rm -r ./prisma

pnpm add prisma -D

npx prisma init --datasource-provider sqlite # 初始化

cp ./depoly/schema.prisma ./prisma/schema.prisma

npx prisma migrate dev --name init # 迁移数据

# 确保安装了 sqlite3
sqlite3 ./prisma/dev.db < ./depoly/seed.sql

# npx prisma studio
pnpm run dev

