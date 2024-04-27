// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";

// components
import { DeleteIt, StatusType } from "~/components/common";
import { Button, Space } from "antd";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import DictItemModal from "~/components/system/dict/CreateDictItemModel";

// utils
import * as clientUtils from "~/utils";

// service
import { AdminSystemDictItemController } from "~/server/controllers/system/admin.system.dict-item.controller";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-Dict" }];
};

// remix:loader
export const loader: LoaderFunction = AdminSystemDictItemController.loader;

export default function SystemDictItemWithIdRoute() {
  const { data: dataSource } = useLoaderData<typeof loader>();
  const nav = useNavigate();
  const fetcher = useFetcher();
  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="字典项目"
        toolBarRender={() => [
          <DictItemModal key="create-dict-modal" record={{}} />,
          <Button
            key="2"
            onClick={() => {
              nav(-1);
            }}
          >
            返回
          </Button>,
        ]}
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "key",
            title: "字典键",
          },
          {
            dataIndex: "value",
            title: "字典值",
          },
          {
            dataIndex: "description",
            title: "描述",
          },
          {
            dataIndex: "remark",
            title: "标记",
          },
          {
            dataIndex: "status",
            title: "状态",
            renderText(_, record) {
              return <StatusType status={record.status} />;
            },
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
            render(_, record) {
              return (
                <div>
                  {record.createdAt
                    ? clientUtils.formatDate(record.createdAt)
                    : "-"}
                </div>
              );
            },
          },
          {
            dataIndex: "updatedAt",
            title: "更新时间",
            render(_, record) {
              return (
                <div>
                  {record.updatedAt
                    ? clientUtils.formatDate(record.updatedAt)
                    : "-"}
                </div>
              );
            },
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space>
                  <DictItemModal key="create-dict-modal" record={record} />
                  <DeleteIt
                    title="确定要删除此部门吗?"
                    fetcher={fetcher}
                    record={record}
                  />
                </Space>
              );
            },
          },
        ]}
      />
    </PageContainer>
  );
}
