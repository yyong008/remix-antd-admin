import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { FeedbackModalCreate } from "./components/feedback-modal-create";
import { FormatTime } from "~/components/common";
import { m } from "~/paraglide/messages";
import { Image } from "antd";
import type { MetaFunction } from "react-router";
import { useState } from "react";

export const handle = () => ({
  breadcrumb: [{ label: m.docs_feedback_title() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.docs_feedback_title() }];
};

export default function Page() {
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, refetch } = {
    data: { data: { list: [], total: 0 } },
    isLoading: false,
    refetch: () => {},
  };

  const columns = [
    { dataIndex: "id", title: m.docs_feedback_column_id() },
    { dataIndex: "content", title: m.docs_feedback_column_content() },
    {
      dataIndex: "url",
      title: m.docs_feedback_column_image(),
      render(_: any, record: any) {
        return (
          <div style={{ width: 100 }}>
            <Image src={record.url} />
          </div>
        );
      },
    },
    {
      dataIndex: "createdAt",
      title: m.docs_feedback_column_created_at(),
      render(_: any, record: any) {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
  ];
  return (
    <PageContainer>
      <AdminTable
        rowKey="id"
        headerTitle={m.docs_feedback_header_title()}
        size="small"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list ?? []}
        columns={columns}
        options={{ reload: refetch }}
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
