// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// components
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Log-OperLog" },
    { name: "System-Log-OperLog", content: "System-Log-OperLog" },
  ];
};

// remix:loader
export const loader: LoaderFunction = () => {
  return json({
    dataSource: [],
  });
};

export default function SystemLogOperLogRoute() {
  const { dataSource } = useLoaderData<typeof loader>();

  return (
    <PageContainer title="system/log/operlog">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "num",
              title: "日志编号",
            },
            {
              dataIndex: "module",
              title: "系统模块",
            },
            {
              dataIndex: "type",
              title: "操作类型",
            },
            {
              dataIndex: "oper",
              title: "操作人员",
            },
            {
              dataIndex: "op_state",
              title: "操作状态",
            },
            {
              dataIndex: "host",
              title: "主机",
            },
            {
              dataIndex: "createdAt",
              title: "创建时间",
            },
            {
              dataIndex: "op",
              title: "操作",
              render(_, record) {
                return <div>record</div>;
              },
            },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
}
