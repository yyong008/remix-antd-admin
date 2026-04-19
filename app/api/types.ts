export type HonoEnv = {
  Bindings: {
    DB: D1Database;
  };
  Variables: {
    userId: string;
    username?: string | null;
  };
};
