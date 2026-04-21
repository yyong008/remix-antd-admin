import { AdminTable } from "~/components/admin-table";

import { PageContainer } from "~/components/page-container";

import { FeedbackModalCreate } from "./components/FeedbackModalCreate";
import { FormatTime } from "@/components/common";
import { Image } from "antd";
import { useState } from "react";

export function Route() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = {
    data: { data: { list: [], total: 0 } },
    isLoading: false,
    refetch: () => {},
  };

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
          <div style={{ width: 100 }}>
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
  ];
  return (
    <PageContainer>
      <AdminTable
        rowKey="id"
        headerTitle="反馈内容"
        size="small"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list ?? []}
        columns={columns}
        options={{
          reload: refetch,
        }}
        toolBarRender={() => [
          <FeedbackModalCreate key="changelog-modal-create" refetch={refetch} />,
        ]}
        pagination={{
          total: data?.data?.total || 0,
          current: page.page,
          pageSize: page.pageSize || 10,
          onChange(p, pageSize) {
            setPage({ page: p, pageSize: pageSize ?? page.pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
