// types
import type { MetaFunction, LoaderFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Log-LogininFor" },
    { name: "System-Log-LogininFor", content: "System-Log-LogininFor" },
  ];
};

// remix:loader
export const loader: LoaderFunction = () => {
  return json({
    dataSource: [],
  });
};

export default function SystemLogLogininforRoute() {
  const { dataSource } = useLoaderData<typeof loader>();

  return (
    <PageContainer title="system/log/logininfor">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "num",
              title: "访问编号",
            },
            {
              dataIndex: "username",
              title: "用户名称",
            },
            {
              dataIndex: "ip",
              title: "地址",
            },
            {
              dataIndex: "address",
              title: "登录地点",
            },
            {
              dataIndex: "system",
              title: "操作系统",
            },
            {
              dataIndex: "browser",
              title: "浏览器",
            },
            {
              dataIndex: "login_state",
              title: "登录状态",
            },
            {
              dataIndex: "desc",
              title: "登录状态",
            },
            {
              dataIndex: "createdAt",
              title: "反问时间",
            },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
}
