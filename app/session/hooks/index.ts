import type { SessionUserContextType } from "../context";

import { useContext } from "react";
import { SessionUserContext } from "../context";

export function useSession(): SessionUserContextType | null {
  const result = useContext(SessionUserContext);
  return result;
}
