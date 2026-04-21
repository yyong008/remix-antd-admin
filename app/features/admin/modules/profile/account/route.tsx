import { Card, Flex } from "antd";

import { PageContainer } from "~/components/page-container";

import { AccountSessions } from "./components/AccountSessions";
import { BasicInfoDescriptions } from "./components/BasicInfoDescriptions";
import { OAuthAccountsSection } from "./components/LinkedOAuthAccounts";
import { useUserInfo } from "~/api-client/queries/system-user";

export function Route() {
  const { data, isLoading } = useUserInfo();
  const userInfo = data?.userInfo;

  return (
    <PageContainer title="账户" loading={isLoading}>
      <Flex vertical gap={16}>
        <Card title="基本信息" variant="outlined">
          <BasicInfoDescriptions userInfo={userInfo} loading={isLoading} />
        </Card>
        <Card title="登录会话" variant="outlined">
          <AccountSessions />
        </Card>
        <OAuthAccountsSection />
      </Flex>
    </PageContainer>
  );
}
