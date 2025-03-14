import { LoginIn, SignIn } from "./components";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import React from "react";
import { useEffect, useState } from "react";

import { getDashboard } from "~/admin/apis/admin/dashboard";

export function Route() {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<any>();

  const getData = async () => {
    const res: any = await getDashboard();
    setData(res?.data);
    setUserInfo(JSON.parse(localStorage.getItem("userInfo") || "{}"));
    setIsLoading(false);
  };
  
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
