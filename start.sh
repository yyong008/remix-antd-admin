#!/bin/bash

pnpm remove prisma @prisma/client

# rm -r node_modules
rm -r ./prisma

pnpm add prisma -D

npx prisma init --datasource-provider sqlite # 初始化

cp ./depoly/sqlite/schema.prisma ./prisma/schema.prisma

npx prisma migrate dev --name init # 迁移数据

# 确保安装了 sqlite3
sqlite3 ./prisma/dev.db < ./depoly/sqlite/seed-delete.sql
sqlite3 ./prisma/dev.db < ./depoly/sqlite/sqls/seed-user.sql
sqlite3 ./prisma/dev.db < ./depoly/sqlite/sqls/seed-role.sql
sqlite3 ./prisma/dev.db < ./depoly/sqlite/sqls/seed-menu.sql
sqlite3 ./prisma/dev.db < ./depoly/sqlite/sqls/seed-menu_role.sql
sqlite3 ./prisma/dev.db < ./depoly/sqlite/sqls/seed-user_role.sql
sqlite3 ./prisma/dev.db < ./depoly/sqlite/sqls/seed-dept.sql
sqlite3 ./prisma/dev.db < ./depoly/sqlite/sqls/seed-dict.sql

# npx prisma studio
pnpm run dev

