#!/bin/bash


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
echo "完毕"

