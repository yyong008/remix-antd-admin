import { createContext, useContext } from "react";
import { useSessionQuery, type SessionUserContextType } from "../hooks/use-session-query";
export type { SessionUserContextType };

const SessionUserContext = createContext<SessionUserContextType | null>(null);

export function useSession() {
  const result = useContext(SessionUserContext);
  if (!result) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return result;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const sessionQuery = useSessionQuery();
  return <SessionUserContext.Provider value={sessionQuery}>{children}</SessionUserContext.Provider>;
}
