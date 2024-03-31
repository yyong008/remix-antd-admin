// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";

// components
import { Button, Space } from "antd";
import { PageContainer, ProTable } from "@ant-design/pro-components";

// service
import { getDictListByDictionaryId } from "~/services/system/dict-item";
import { formatDate } from "~/utils/utils";
import StatusType from "~/components/common/StatusType";
import DictItemModal from "~/components/system/dict/CreateDictItemModel";
import DeleteIt from "~/components/common/DeleteIt";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Dict" },
    { name: "System-Dict", content: "System-Dict" },
  ];
};

// remix:loader
export const loader: LoaderFunction = async ({ params, request }) => {
  const { did, lang } = params;
  if (!lang || !did) {
    return redirect(`/${lang}/system/dict`);
  }
  return json({
    dataSource: await getDictListByDictionaryId(Number(did)),
  });
};

export default function SystemDictRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
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
            renderText(text, record, index, action) {
              return <StatusType status={record.status} />;
            },
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
            render(_, record) {
              return (
                <div>
                  {record.createdAt ? formatDate(record.createdAt) : "-"}
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
                  {record.updatedAt ? formatDate(record.updatedAt) : "-"}
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
