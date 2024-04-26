// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { Link, useLoaderData } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import LinkModal from "~/components/link/LinkModal";
import { Space, Tag } from "antd";
import LinkSvg from "~/components/svg/LinkSvg";

// hooks
import { useFetcherChange } from "~/hooks";

// controllers
import { AdminProfileLinkController } from "~/server/controllers/profile";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

export const action: LoaderFunction = AdminProfileLinkController.action;
export const loader: LoaderFunction = AdminProfileLinkController.loader;

export default function SystemConfigRoute() {
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
