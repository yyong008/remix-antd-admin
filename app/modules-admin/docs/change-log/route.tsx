import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

import { ChangeLogCreateModal } from "./components/ChangeLogModalCreate";
import ChangeLogUpdateModal from "./components/ChangeLogModalUpdate";
import { DeleteIt } from "./components/delete-it";
import { FormatTime } from "@/components/common";
import { useParams } from "@remix-run/react";
import { useReadChangelogQuery } from "@/apis-client/admin/docs/changelog";
import { useState } from "react";

const typeMap = {
  1: {
    color: "blue",
    text: "重大更新",
  },
  2: {
    color: "green",
    text: "功能更新",
  },
  3: {
    color: "volcano",
    text: "Bug 修复",
  },
};

export function Route() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadChangelogQuery(page);
  const { total = 0, list = [] } = data?.data || {};
  const params = useParams();

  const columns = [
    {
      dataIndex: "publish_version",
      title: "版本",
    },
    {
      dataIndex: "publish_name",
      title: "发布者",
    },
    {
      dataIndex: "type",
      title: "更新类型",
      render: (_: any, record: { type: 1 | 2 | 3 }) => (
        <Tag color={typeMap?.[record.type]?.color}>
          {typeMap?.[record.type]?.text}
        </Tag>
      ),
    },
    {
      dataIndex: "content",
      title: "发布内容",
      ellipsis: true,
    },
    {
      dataIndex: "url",
      title: "跳转链接",
      ellipsis: true,
      render(_: any, record: any) {
        return <a href={record.url}>{record.url}</a>;
      },
    },
    {
      dataIndex: "publish_time",
      title: "发布时间",
      render(_: any, record: any) {
        return <FormatTime timeStr={record.publish_time} />;
      },
    },
    {
      dataIndex: "createdAt",
      title: "创建时间",
      render(_: any, record: any) {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
    {
      dataIndex: "updatedAt",
      title: "更新时间",
      render(_: any, record: any) {
        return <FormatTime timeStr={record.updatedAt} />;
      },
    },
    {
      dataIndex: "op",
      title: "操作",
      render(_: any, record: any) {
        return (
          <Space>
            <ChangeLogUpdateModal
              key="changelog-modal-modify"
              record={record}
              refetch={refetch}
            />
            <DeleteIt record={record} title={""} refetch={refetch} />
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        headerTitle="更新日志"
        size="small"
        search={false}
        dataSource={list ?? []}
        loading={isLoading}
        columns={columns}
        toolBarRender={() => [
          <ChangeLogCreateModal
            key="changelog-modal-create"
            refetch={refetch}
          />,
        ]}
        options={{
          reload: refetch,
        }}
        pagination={{
          total,
          pageSize: Number(params.pageSize ?? 10),
          onChange(page, pageSize) {
            setPage({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
