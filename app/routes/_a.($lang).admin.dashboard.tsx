// types
import type { LoaderFunction } from "@remix-run/node";

// remix
import { useLoaderData, useMatches, useSubmit } from "@remix-run/react";

// components
import { Button, Tag } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// controller
import { AdminDashboardController } from "~/server/controllers/dashboard";

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
            <div>
              欢迎用户 <Tag color="cyan">{userInfo.name}</Tag> ~
            </div>
            <SignIn data={data} />
          </div>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
}

function SignIn({ data }: any) {
  const submit = useSubmit();
  return (
    <div>
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
        {data.isLogin ? "已" : ""}签到
      </Button>
    </div>
  );
}
