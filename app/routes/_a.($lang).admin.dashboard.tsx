// types
import type { LoaderFunction } from "@remix-run/node";

// remix
import { useLoaderData, useMatches, useSubmit } from "@remix-run/react";

// components
import { Button, Descriptions } from "antd";
import { AiFillCheckCircle, AiOutlineSmile } from "react-icons/ai";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// controller
import { AdminDashboardController } from "~/server/controllers/dashboard";
import { FormatTime } from "~/components/common";

export const loader: LoaderFunction = AdminDashboardController.loader;

export default function Dashboard() {
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

function LoginIn({ data, userInfo }: any) {
  return (
    <div>
      <div className="flex items-center text-[20px] pb-[10px]">
        <AiOutlineSmile className="mr-[10px]" />
        欢迎，<span className="text-lime-500">{userInfo.name}</span>
      </div>
      <Descriptions column={3} size="small">
        <Descriptions.Item label="所属部门">
          {userInfo.department.name}
        </Descriptions.Item>
        <Descriptions.Item label="最近登录时间">
          <FormatTime timeStr={data.latestLoginLog.loginAt} />
        </Descriptions.Item>
        <Descriptions.Item label="最近登录ip">
          {data.latestLoginLog.ip}
        </Descriptions.Item>
        <Descriptions.Item label="最近登录系统">
          {data.latestLoginLog.system}
        </Descriptions.Item>
        <Descriptions.Item label="最近登录设备">
          {data.latestLoginLog.browser}
        </Descriptions.Item>
        <Descriptions.Item label="最近登录地址">
          {data.latestLoginLog.address}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

function SignIn({ data }: any) {
  const submit = useSubmit();
  return (
    <div>
      {!data.isLogin ? (
        <Button
          onClick={() => {
            submit(
              {},
              {
                method: "post",
                action: "/api/signin",
                navigate: false,
              },
            );
          }}
          htmlType="submit"
          disabled={data.isLogin}
        >
          签到
        </Button>
      ) : (
        <Button type="primary" icon={<AiFillCheckCircle />}>
          已签到
        </Button>
      )}
    </div>
  );
}
