import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { ChangeLogCreateModal } from "./components/change-log-modal-create";
import ChangeLogUpdateModal from "./components/change-log-modal-update";
import { DeleteIt } from "./components/delete-it";
import { FormatTime } from "~/components/common";
import { m } from "~/paraglide/messages";
import { Space, Tag } from "antd";
import type { MetaFunction } from "react-router";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: m.docs_changelog_title() }];
};

const typeMap = {
  1: { color: "blue", text: m.docs_changelog_type_major() },
  2: { color: "green", text: m.docs_changelog_type_feature() },
  3: { color: "volcano", text: m.docs_changelog_type_fix() },
};

export default function Page() {
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, refetch } = {
    data: { list: [], total: 0 },
    isLoading: false,
    refetch: () => {},
  };

  const { total = 0, list = [] } = data || {};

  const columns = [
    { dataIndex: "publish_version", title: m.docs_changelog_column_version() },
    { dataIndex: "publish_name", title: m.docs_changelog_column_publisher() },
    {
      dataIndex: "type",
      title: m.docs_changelog_column_type(),
      render: (_: any, record: { type: 1 | 2 | 3 }) => (
        <Tag color={typeMap?.[record.type]?.color}>{typeMap?.[record.type]?.text}</Tag>
      ),
    },
    { dataIndex: "content", title: m.docs_changelog_column_content(), ellipsis: true },
    {
      dataIndex: "url",
      title: m.docs_changelog_column_url(),
      ellipsis: true,
      render(_: any, record: any) {
        return <a href={record.url}>{record.url}</a>;
      },
    },
    {
      dataIndex: "publish_time",
      title: m.docs_changelog_column_publish_time(),
      render(_: any, record: any) {
        return <FormatTime timeStr={record.publish_time} />;
      },
    },
    {
      dataIndex: "createdAt",
      title: m.system_created_at(),
      render(_: any, record: any) {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
    {
      dataIndex: "updatedAt",
      title: m.system_updated_at(),
      render(_: any, record: any) {
        return <FormatTime timeStr={record.updatedAt} />;
      },
    },
    {
      dataIndex: "op",
      title: m.system_action(),
      render(_: any, record: any) {
        return (
          <Space>
            <ChangeLogUpdateModal record={record} refetch={refetch} />
            <DeleteIt record={record} title={""} refetch={refetch} />
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <AdminTable
        rowKey="id"
        headerTitle={m.docs_changelog_header_title()}
        size="small"
        search={false}
        dataSource={list ?? []}
        loading={isLoading}
        columns={columns}
        toolBarRender={() => [
          <ChangeLogCreateModal key="changelog-modal-create" refetch={refetch} />,
        ]}
        options={{ reload: refetch }}
        pagination={{
          total,
          current: page.page,
          pageSize: page.pageSize,
          onChange(p, pageSize) {
            setPage({ page: p, pageSize: pageSize ?? page.pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
