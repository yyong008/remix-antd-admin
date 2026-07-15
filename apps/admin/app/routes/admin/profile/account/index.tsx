import type { MetaFunction } from "react-router";

import { Card, Flex } from "antd";
import { m } from "~/paraglide/messages";
import { PageContainer } from "~/components/page-container";
import { AccountSessions } from "./components/account-sessions";
import { useUserInfo } from "~/api-client/queries/system/system-user";
import { OAuthAccountsSection } from "./components/linked-o-auth-accounts";
import { BasicInfoDescriptions } from "./components/basic-info-descriptions";

export const handle = () => ({
  breadcrumb: [{ label: m.profile_account_title() }],
});

export const meta: MetaFunction = () => [{ title: "Profile · account" }];

export default function Page() {
  const { isLoading } = useUserInfo();

  return (
    <PageContainer
      title={m.profile_account_title()}
      loading={isLoading}
      style={{ width: "70%", margin: "0 auto" }}
    >
      <Flex vertical gap={16}>
        <Card title={m.profile_account_basic_info()} variant="outlined">
          <BasicInfoDescriptions />
        </Card>
        <Card title={m.profile_account_sessions()} variant="outlined">
          <AccountSessions />
        </Card>
        <OAuthAccountsSection />
      </Flex>
    </PageContainer>
  );
}
