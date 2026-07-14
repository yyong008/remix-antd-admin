import { customSession } from "better-auth/plugins";

export function customSessionPlugin() {
  return customSession(async ({ user, session }, _ctx) => {
    const omitRoleUser = Object.fromEntries(Object.entries(user).filter(([k]) => k !== "role"));
    return {
      user: omitRoleUser,
      session,
    };
  });
}
