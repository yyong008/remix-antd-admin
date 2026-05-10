import type { DrizzleD1Database } from "drizzle-orm/d1";

import { createBlogDAL } from "@workspace/database/dals/blog/BlogDAL";
import { createChangeLogDAL } from "@workspace/database/dals/docs/ChangelogDAL";
import { createFeedbackDAL } from "@workspace/database/dals/docs/FeedbackDAL";
import { createNewsDAL } from "@workspace/database/dals/news/NewsDAL";
import { createNewsCategoryDAL } from "@workspace/database/dals/news/NewsCategoryDAL";
import { createOperateDAL } from "@workspace/database/dals/operate/operateDAL";
import { createDeptDAL } from "@workspace/database/dals/system/DeptDAL";
import { createLoginLogDAL } from "@workspace/database/dals/system/LoginLogDAL";
import { createMenuDAL } from "@workspace/database/dals/system/MenuDAL";
import { createRoleDAL } from "@workspace/database/dals/system/RoleDAL";
import { createUserDAL } from "@workspace/database/dals/system/UserDAL";
import { AdminDashboardStats } from "apps/admin/app/api-client/queries/dashboard/dashboard";

type Loader = {
  perm: string;
  apply: (stats: AdminDashboardStats, value: number) => void;
  load: () => Promise<number>;
};

export async function loadAdminDashboardStats(
  db: DrizzleD1Database,
  permissions: string[],
): Promise<AdminDashboardStats | null> {
  const userDAL = createUserDAL(db);
  const roleDAL = createRoleDAL(db);
  const deptDAL = createDeptDAL(db);
  const menuDAL = createMenuDAL(db);
  const newsDAL = createNewsDAL(db);
  const newsCategoryDAL = createNewsCategoryDAL(db);
  const blogDAL = createBlogDAL(db);
  const loginLogDAL = createLoginLogDAL(db);
  const operateDAL = createOperateDAL(db);
  const changeLogDAL = createChangeLogDAL(db);
  const feedbackDAL = createFeedbackDAL(db);

  const loaders: Loader[] = [
    {
      perm: "system:user:read",
      apply: (s, v) => {
        s.userCount = v;
      },
      load: () => userDAL.getCount(),
    },
    {
      perm: "system:role:read",
      apply: (s, v) => {
        s.roleCount = v;
      },
      load: () => roleDAL.getCount(),
    },
    {
      perm: "system:dept:read",
      apply: (s, v) => {
        s.deptCount = v;
      },
      load: () => deptDAL.getCount(),
    },
    {
      perm: "system:menu:read",
      apply: (s, v) => {
        s.menuCount = v;
      },
      load: () => menuDAL.getCount(),
    },
    {
      perm: "news:list:read",
      apply: (s, v) => {
        s.newsCount = v;
      },
      load: () => newsDAL.getCount(),
    },
    {
      perm: "news:list:read",
      apply: (s, v) => {
        s.newsCategoryCount = v;
      },
      load: () => newsCategoryDAL.getCount(),
    },
    {
      perm: "blog:list:read",
      apply: (s, v) => {
        s.blogCount = v;
      },
      load: () => blogDAL.getCount(),
    },
    {
      perm: "system:monitor:loginlog:read",
      apply: (s, v) => {
        s.loginLogCount = v;
      },
      load: () => loginLogDAL.getCount(),
    },
    {
      perm: "system:monitor:operate:read",
      apply: (s, v) => {
        s.operateLogCount = v;
      },
      load: () => operateDAL.getOperatesCount({ where: {} }),
    },
    {
      perm: "docs:changelog:read",
      apply: (s, v) => {
        s.changelogCount = v;
      },
      load: () => changeLogDAL.getCount(),
    },
    {
      perm: "docs:feedback:read",
      apply: (s, v) => {
        s.feedbackCount = v;
      },
      load: () => feedbackDAL.getCount(),
    },
  ];

  const active = loaders.filter((l) => permissions.includes(l.perm));
  if (!active.length) return null;

  const values = await Promise.all(active.map((l) => l.load()));
  const stats: AdminDashboardStats = {};
  active.forEach((l, i) => {
    l.apply(stats, values[i]!);
  });
  return stats;
}
