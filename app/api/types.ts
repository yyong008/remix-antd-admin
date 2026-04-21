export type HonoEnv = {
  Bindings: {
    DB: D1Database;
    STORAGE?: R2Bucket;
  };
  Variables: {
    userId: string;
    username?: string | null;
    /** Application RBAC: permission strings from `sys_menu.permission` for the current user. */
    permissions?: string[];
  };
};
