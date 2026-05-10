import { Card, Flex, Grid } from "antd";

import { PageContainer } from "~/components/page-container";
import { useDashboard } from "~/api-client/queries/dashboard/dashboard";
import { useUserInfo } from "~/api-client/queries/system/system-user";

import { AdminDashboardStats, LoginIn, SignIn } from "./components";

export function Dashboard() {
  const screens = Grid.useBreakpoint();
  const { data: dashboardData, isLoading } = useDashboard();
  const { data: userPayload, isLoading: userInfoLoading } = useUserInfo();
  const userInfo = userPayload?.userInfo ?? null;
  const stats = dashboardData?.stats;

  return (
    <PageContainer loading={isLoading || userInfoLoading}>
      {stats && Object.keys(stats).length > 0 ? <AdminDashboardStats stats={stats} /> : null}
      <Card>
        <Flex
          vertical={!screens.md}
          gap={24}
          justify={screens.md ? "space-between" : undefined}
          align={screens.md ? "flex-start" : undefined}
          style={{ width: "100%" }}
        >
          <LoginIn data={dashboardData} userInfo={userInfo} />
          <SignIn data={dashboardData} />
        </Flex>
      </Card>
    </PageContainer>
  );
}
