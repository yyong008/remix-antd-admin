#!/bin/bash

pnpm i

rm -rf .env ./prisma

echo
echo "👌清除 .env 和 ./prisma 文件夹完成"
echo

npx prisma init --datasource-provider sqlite # 初始化

cp .env.tpl .env
cp ./depoly/schema.prisma ./prisma/schema.prisma

echo
echo "👌复制 .env.tpl 和 ./prisma/schema.prisma 文件完成"
echo

npx prisma migrate dev --name init # 迁移数据

# 确保安装了 sqlite3
sqlite3 ./prisma/dev.db < ./depoly/seed.sql

echo "👌数据初始化已完成"


