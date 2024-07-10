import { Link, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

import { LinkModalCreate } from "./components/link-modal-create";
import { LinkModalUpdate } from "./components/link-modal-update";
import LinkSvg from "./components/link-svg";
import { useReadProfileLinkListQuery } from "@/apis-client/admin/profile/link";
import { useState } from "react";

export function Route() {
  const { id } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    id,
  });
  const { data, isLoading, refetch } = useReadProfileLinkListQuery(page);
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list || []}
        toolBarRender={() => [
          <LinkModalCreate refetch={refetch} key="create-link-modal" />,
        ]}
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total,
          pageSize: 10,
          onChange(_page, pageSize) {
            setPage({
              ...page,
              page: _page,
              pageSize,
            });
          },
        }}
        columns={[
          {
            dataIndex: "name",
            title: "链接名",
          },
          {
            dataIndex: "url",
            title: "链接地址",
            renderText(text, record: any) {
              return (
                <Link to={record.url} target="_blank">
                  <Tag className="inline-flex" color="cyan">
                    {record.url}
                    <LinkSvg className="border-yellow-200 w-[16px]" />
                  </Tag>
                </Link>
              );
            },
          },
          {
            dataIndex: "description",
            title: "描述",
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space>
                  <LinkModalUpdate
                    refetch={refetch}
                    record={record}
                    key="modify-link-modal"
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
