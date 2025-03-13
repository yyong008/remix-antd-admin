import { PageContainer, ProTable } from "@ant-design/pro-components";

import { FeedbackModalCreate } from "./components/FeedbackModalCreate";
import { FormatTime } from "@/components/common";
import { Image, Button } from "antd";
import { getFeedbacks } from "~/admin/apis/admin/docs";
import { useSimplePage } from "~/hooks/useSimplePage";
import FeedbackModalUpdate from "./components/FeedbackModalUpdate";

export function Route() {
  const { page, setPage, data, isLoading, getPage } =
    useSimplePage(getFeedbacks);

  const columns = [
    {
      dataIndex: "id",
      title: "反馈编号",
    },
    {
      dataIndex: "content",
      title: "反馈内容",
    },
    {
      dataIndex: "url",
      title: "反馈图片",
      render(_: any, record: any) {
        return (
          <div className="h-[50px] w-[100px] overflow-hidden origin-center">
            <Image src={record.url}></Image>
          </div>
        );
      },
    },
    {
      dataIndex: "createdAt",
      title: "反馈时间",
      render(_: any, record: any) {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
    {
      dataIndex: "op",
      title: "操作",
      render(_: any, record: any) {
        return <div>
          <FeedbackModalUpdate record={record} refetch={getPage} />
        </div>
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        headerTitle="反馈内容"
        size="small"
        search={false}
        loading={isLoading}
        dataSource={data?.list ?? []}
        columns={columns}
        options={{
          reload: getPage,
        }}
        toolBarRender={() => [
          <FeedbackModalCreate
            key="changelog-modal-create"
            refetch={getPage}
          />,
        ]}
        pagination={{
          total: data.total || 0,
          pageSize: page?.pageSize || 10,
          onChange(page, pageSize) {
            setPage({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
