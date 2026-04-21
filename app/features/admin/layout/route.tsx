import * as clientUtils from "~/utils/client";

import { Outlet, useParams, useNavigate } from "react-router";
import { memo, useContext, useMemo, useEffect } from "react";

import { App as AntdApp } from "antd";
import { Spin } from "antd";
import { AdminShellLayout } from "./components/AdminShellLayout";
import { SettingContext } from "@/context/setting-context";
import { SettingDrawerWrap } from "./components/SettingDrawerWrap";
import { useUserInfo } from "~/api-client/queries/system-user";
import { useSession } from "~/session/hooks";

function AdminLayout() {
  const { data, isLoading } = useUserInfo();
  const sessionCtx = useSession();
  const navigate = useNavigate();

  const { locale } = useParams();
  const value = useContext(SettingContext);
  const menu = data?.menu ?? [];
  const userInfo = data?.userInfo;
  const route = useMemo(() => clientUtils.createProLayoutRoute(locale!, menu), [locale, menu]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!sessionCtx?.isSessionPending && !sessionCtx?.session) {
      navigate(locale ? `/${locale}/auth/login` : "/auth/login");
    }
  }, [sessionCtx?.isSessionPending, sessionCtx?.session, navigate, locale]);

  const isPending = sessionCtx?.isSessionPending || isLoading;

  /** System profile (menu/RBAC) + session user (better-auth) so name/avatar always show when either source has data. */
  const headerUser = useMemo(() => {
    const api = userInfo as {
      name?: string | null;
      nickname?: string | null;
      email?: string | null;
      avatar?: string | null;
    } | null;
    const su = sessionCtx?.user as
      | { name?: string | null; email?: string | null; image?: string | null }
      | null
      | undefined;
    return {
      name: api?.name ?? su?.name ?? null,
      nickname: api?.nickname ?? null,
      email: api?.email ?? su?.email ?? null,
      avatar: api?.avatar ?? su?.image ?? null,
    };
  }, [userInfo, sessionCtx?.user]);

  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <AntdApp>
      <AdminShellLayout loading={isLoading} route={route} user={headerUser}>
        <Outlet />
        <SettingDrawerWrap theme={value.theme} setTheme={value.setTheme} />
      </AdminShellLayout>
    </AntdApp>
  );
}

export const Route = memo(AdminLayout);
