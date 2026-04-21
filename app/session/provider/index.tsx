import { SessionUserContext } from "../context/index";
import { useUserSessionQuery, useRefreshUserSession } from "~/api-client/queries/session";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data: sessionData, isPending: isSessionPending } = useUserSessionQuery();
  const refreshUserSession = useRefreshUserSession();

  return (
    <SessionUserContext.Provider
      value={{
        session: sessionData?.session || null,
        user: sessionData?.user || null,
        isSessionPending,
        refreshUserSession,
      }}
    >
      {children}
    </SessionUserContext.Provider>
  );
}
