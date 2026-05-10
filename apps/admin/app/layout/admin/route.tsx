import { Outlet, useParams } from "react-router";
import { memo, useContext, useMemo } from "react";

import { App as AntdApp } from "antd";
import { Spin } from "antd";
import { AdminShellLayout } from "./components/AdminShellLayout";
import { SettingContext } from "~/context/setting-context";
import { SettingDrawerWrap } from "./components/SettingDrawerWrap";
import { useUserInfo } from "~/api-client/queries/system/system-user";
import { useSession } from "~/session/provider";
import { ClientOnly } from "~/components/common/client-only";
import { createProLayoutRoute } from "~/utils/client";

function AdminLayout() {
  const { locale } = useParams();
  const { data, isLoading } = useUserInfo();
  const sessionCtx = useSession();

  const value = useContext(SettingContext);
  const menu = data?.menu ?? [];
  const userInfo = data?.userInfo;
  const route = useMemo(
    () => createProLayoutRoute(locale!, menu),
    [locale, menu],
  );

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

  if (isLoading) {
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
    <ClientOnly fallback={<>sdf</>}>
      {() => (
        <AntdApp>
          <AdminShellLayout loading={isLoading} route={route} user={headerUser}>
            <Outlet />
            <SettingDrawerWrap theme={value.theme} setTheme={value.setTheme} />
          </AdminShellLayout>
        </AntdApp>
      )}
    </ClientOnly>
  );
}

export const Route = memo(AdminLayout);