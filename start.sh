#!/bin/bash

pnpm i

cp .env.tpl .env

rm -rf ./prisma/dev.db

npx prisma init --datasource-provider sqlite # 初始化

cp ./depoly/schema.prisma ./prisma/schema.prisma

npx prisma migrate dev --name init # 迁移数据

# 确保安装了 sqlite3
sqlite3 ./prisma/dev.db < ./depoly/seed.sql

echo "👌数据初始化已完成"


