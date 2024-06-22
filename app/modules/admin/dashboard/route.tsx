import { LoginIn, SignIn } from "./components";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { useGetDashboardQuery } from "~/lib/features/apis/dashboard";
import { useSelectUserInfo } from "~/lib/features/apis/userinfo";

export function Route() {
  const userInfo = useSelectUserInfo();
  const _data = useGetDashboardQuery("");
  const { data, isLoading } = _data || {};

  return (
    <PageContainer loading={isLoading}>
      <ProCard>
        <ProCard>
          <div className="flex justify-between">
            <LoginIn data={data} userInfo={userInfo} />
            <SignIn data={data} />
          </div>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
}
