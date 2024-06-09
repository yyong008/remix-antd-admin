import { LoginIn, SignIn } from "./components";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useLoaderData, useMatches } from "@remix-run/react";

import type { loader } from "./loader";

export function Route() {
  const { data } = useLoaderData<typeof loader>();
  const matches = useMatches();

  const userInfo = (matches[1].data as any).data?.userInfo ?? {};
  return (
    <PageContainer>
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
