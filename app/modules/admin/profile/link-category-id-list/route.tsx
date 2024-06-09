import { Link, useLoaderData } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

import LinkModal from "~/modules/admin/profile/link-category-id-list/components/LinkModal";
import LinkSvg from "~/modules/admin/profile/link-category-id-list/LinkSvg";
import type { loader } from "./loader";
import { useFetcherChange } from "~/hooks";

export function Route() {
  const { data: dataSource } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        toolBarRender={() => [
          <LinkModal record={{}} fetcher={fetcher} key="create-link-modal" />,
        ]}
        columns={[
          {
            dataIndex: "name",
            title: "链接名",
          },
          {
            dataIndex: "url",
            title: "链接地址",
            renderText(text, record, index, action) {
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
                  <LinkModal
                    record={record}
                    fetcher={fetcher}
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
