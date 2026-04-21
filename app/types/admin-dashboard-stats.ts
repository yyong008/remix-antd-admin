/** Optional counts returned by `GET /api/admin/dashboard` when RBAC allows. */
export type AdminDashboardStats = {
  userCount?: number;
  roleCount?: number;
  deptCount?: number;
  menuCount?: number;
  newsCount?: number;
  newsCategoryCount?: number;
  blogCount?: number;
  loginLogCount?: number;
  operateLogCount?: number;
  changelogCount?: number;
  feedbackCount?: number;
};

export type DashboardPayload = {
  isLogin: boolean;
  latestLoginLog: Record<string, unknown> | null;
  /** Present when the user has at least one permission that maps to a metric. */
  stats?: AdminDashboardStats | null;
};
