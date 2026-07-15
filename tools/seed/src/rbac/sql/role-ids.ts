/** Fixed `sys_role.id` values (seeded by `rbac/sql/seed.sql`; `user` matches rbac-login default role). */
export const LOCAL_ROLE_IDS = {
  user: "01900000-0000-7000-8000-000000000001",
  superadmin: "01900000-0000-7000-8000-000000000002",
  admin: "01900000-0000-7000-8000-000000000003",
} as const;
