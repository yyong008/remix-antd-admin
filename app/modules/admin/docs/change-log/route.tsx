import { DeleteIt, FormatTime } from "~/components/common";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";
import { useFeedbackNav, useFetcherChange } from "~/hooks";
import { useLoaderData, useParams } from "@remix-run/react";

import ChangeLogModal from "~/modules/admin/docs/change-log/components/ChangeLogModal";
import type { loader } from "./loader";

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
  const { data } = useLoaderData<typeof loader>();
  const { total = 0, list = [] } = data;
  const params = useParams();
  const [navFeedback] = useFeedbackNav();
  const fetcher = useFetcherChange();

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
        <Tag color={typeMap?.[record.type].color}>
          {typeMap?.[record.type].text}
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
            <ChangeLogModal key="changelog-modal-modify" record={record} />
            <DeleteIt fetcher={fetcher} record={record} title={""} />
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="更新日志"
        size="small"
        search={false}
        dataSource={list ?? []}
        columns={columns}
        toolBarRender={() => [
          <ChangeLogModal key="changelog-modal-create" record={{}} />,
        ]}
        pagination={{
          total,
          pageSize: Number(params.pageSize ?? 10),
          onChange(page, pageSize) {
            navFeedback({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
