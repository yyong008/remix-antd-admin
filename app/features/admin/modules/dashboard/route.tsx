import { LoginIn, SignIn } from "./components";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useEffect, useState } from "react";

import { getDashboard } from "~/features/admin/apis/admin/dashboard";

export function Route() {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const res: any = await getDashboard();
    setData(res?.data);
    setIsLoading(false);
  };
  const userInfo = {};
  useEffect(() => {
    getData();
  }, []);

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
