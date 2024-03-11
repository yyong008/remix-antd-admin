// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// component
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Dept" },
    { name: "System-Dept", content: "System-Dept" },
  ];
};

// remix:loader
export const loader: LoaderFunction = () => {
  return json({
    dataSource: [],
  });
};

export default function SystemDeptRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="system/dept">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "name",
              title: "用户名",
            },
            {
              dataIndex: "nickname",
              title: "昵称",
            },
            {
              dataIndex: "dept",
              title: "部门",
            },
            {
              dataIndex: "phone",
              title: "手机号码",
            },
            {
              dataIndex: "state",
              title: "状态",
            },
            {
              dataIndex: "createdAt",
              title: "创建时间",
            },
            {
              dataIndex: "op",
              title: "操作",
              render(_) {
                return <div>record</div>;
              },
            },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
}
