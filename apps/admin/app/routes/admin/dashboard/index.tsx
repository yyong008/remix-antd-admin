import type { MetaFunction } from "react-router";

import { m } from "~/paraglide/messages";
import { DashboardView } from "./components";
import { PageContainer } from "~/components/page-container";
import { useUserInfo } from "~/api-client/queries/system/system-user";
import { useDashboard } from "~/api-client/queries/dashboard/dashboard";

export const meta: MetaFunction = () => {
  return [{ title: m.dashboard_title() }];
};

export default function Page() {
  const { data: dashboardData, isLoading } = useDashboard();
  const { data: userPayload, isLoading: userInfoLoading } = useUserInfo();

  return (
    <PageContainer
      loading={isLoading || userInfoLoading}
      style={{ width: "60%", margin: "0 auto" }}
    >
      <DashboardView data={dashboardData} userInfo={userPayload?.userInfo ?? null} />
    </PageContainer>
  );
}
