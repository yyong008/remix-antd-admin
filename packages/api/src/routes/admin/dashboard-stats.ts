import * as blog from "@workspace/database/repositories/blog/blog";
import * as changelog from "@workspace/database/repositories/docs/changelog";
import * as feedback from "@workspace/database/repositories/docs/feedback";
import * as news from "@workspace/database/repositories/news/news";
import * as newsCategory from "@workspace/database/repositories/news/news-category";
import * as operate from "@workspace/database/repositories/operate/operate";
import * as dept from "@workspace/database/repositories/system/dept";
import * as loginLog from "@workspace/database/repositories/system/login-log";
import * as menu from "@workspace/database/repositories/system/menu";
import * as role from "@workspace/database/repositories/system/role";
import * as user from "@workspace/database/repositories/system/user";
import type { DrizzleD1Database } from "drizzle-orm/d1";

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
  const loaders: Loader[] = [
    {
      perm: "system:user:read",
      apply: (s, v) => {
        s.userCount = v;
      },
      load: () => user.getCount(db),
    },
    {
      perm: "system:role:read",
      apply: (s, v) => {
        s.roleCount = v;
      },
      load: () => role.getCount(db),
    },
    {
      perm: "system:dept:read",
      apply: (s, v) => {
        s.deptCount = v;
      },
      load: () => dept.getCount(db),
    },
    {
      perm: "system:menu:read",
      apply: (s, v) => {
        s.menuCount = v;
      },
      load: () => menu.getCount(db),
    },
    {
      perm: "news:list:read",
      apply: (s, v) => {
        s.newsCount = v;
      },
      load: () => news.getCount(db),
    },
    {
      perm: "news:list:read",
      apply: (s, v) => {
        s.newsCategoryCount = v;
      },
      load: () => newsCategory.getCount(db),
    },
    {
      perm: "blog:list:read",
      apply: (s, v) => {
        s.blogCount = v;
      },
      load: () => blog.getCount(db),
    },
    {
      perm: "system:monitor:loginlog:read",
      apply: (s, v) => {
        s.loginLogCount = v;
      },
      load: () => loginLog.getCount(db),
    },
    {
      perm: "system:monitor:operate:read",
      apply: (s, v) => {
        s.operateLogCount = v;
      },
      load: () => operate.getOperatesCount(db, { where: {} }),
    },
    {
      perm: "docs:changelog:read",
      apply: (s, v) => {
        s.changelogCount = v;
      },
      load: () => changelog.getCount(db),
    },
    {
      perm: "docs:feedback:read",
      apply: (s, v) => {
        s.feedbackCount = v;
      },
      load: () => feedback.getCount(db),
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
