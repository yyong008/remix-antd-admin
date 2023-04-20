// 下发的路由表，当对档期的路由进行拦截
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

export default function Auth({ routes = [], children }: any) {
  const match = useMatches();

  const _showCurRoute = useMemo(() => {
    return routes.some((r: any) => {
      console.log(r.id, match[match.length - 1].id, r.id === match[match.length - 1].id)
      return r.id === match[match.length - 1].id;
    });
  }, [routes, match]);

  if (routes.length === 0 || !_showCurRoute) {
    return null;
  }
  return <>{children}</>;
}
