import type { authClient } from "~/libs/auth/client";

import { createContext } from "react";

export type SessionData = typeof authClient.$Infer.Session;

export type SessionUserContextType = {
  session: SessionData["session"] | null;
  user: SessionData["user"] | null;
  /** True while the initial `getSession` request is in flight (client). */
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  cleanSession: () => void;
};

export const SessionUserContext = createContext<SessionUserContextType | null>(null);
