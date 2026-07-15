import { Card, Flex } from "antd";
import type { MetaFunction } from "react-router";

import { useUserInfo } from "~/api-client/queries/system/system-user";
import { PageContainer } from "~/components/page-container";
import { m } from "~/paraglide/messages";

import { AccountSessions } from "./components/account-sessions";
import { BasicInfoDescriptions } from "./components/basic-info-descriptions";
import { OAuthAccountsSection } from "./components/linked-o-auth-accounts";

export const handle = () => ({
  breadcrumb: [{ label: m.profile_account_title() }],
});

export const meta: MetaFunction = () => [{ title: "Profile · account" }];

export function Route() {
  const { isLoading } = useUserInfo();

  return (
    <PageContainer title={m.profile_account_title()} loading={isLoading}>
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

export default function Page() {
  return <Route />;
}
