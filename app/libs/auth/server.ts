import { betterAuth, } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, openAPI } from "better-auth/plugins"
import * as schema from "db/schema";

import { db } from "~/libs/neon";

export const auth = betterAuth({
  baseURL: "http://localhost:5173",
  // https://www.better-auth.com/docs/adapters/drizzle
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    /**
     * https://www.better-auth.com/docs/plugins/admin
     * operations such as creating users, managing user roles, banning/unbanning users, impersonating users, and more.
     */
    admin(),
    /**
     /**
     * https://www.better-auth.com/docs/plugins/open-api#configuration
     */
    openAPI(),
  ],
  // https://www.better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // https://www.better-auth.com/docs/concepts/email#password-reset-email
    sendResetPassword: async ({ user, url }, request) => {
      const locale = getCookieLocaleByRequest(request!);
      await sendEmail({
        tId: "forgotPassword",
        to: user.email,
        props: {
          name: user.name,
          url: url,
        },
        locale,
      });
    },
  },
  socialProviders: {
    // https://www.better-auth.com/docs/authentication/github
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    // https://www.better-auth.com/docs/authentication/google
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  // Session configuration
  // https://www.better-auth.com/docs/concepts/session
  session: {
    // Session expires after 7 days
    expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds
    // Update session age every 24 hours
    updateAge: 60 * 60 * 24, // 1 day in seconds
  },
  advanced: {
    database: {
      generateId: () => {
        return crypto.randomUUID();
      },
    },
  },
});
