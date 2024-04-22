// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { Link, useLoaderData, useParams } from "@remix-run/react";

// components
import { Space, Tag } from "antd";
import { DeleteIt } from "~/components/common";
import LinkCategoryModal from "~/components/link/LinkCategoryModal";
import { PageContainer, ProTable } from "@ant-design/pro-components";

import { AdminProfileLinkCategoryController } from "~/server/controllers/admin.profile.link.category.controller";

// hooks
import { useFetcherChange } from "~/hooks";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

export const action: LoaderFunction = AdminProfileLinkCategoryController.action;
export const loader: LoaderFunction = AdminProfileLinkCategoryController.loader;

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();

  return (
    <PageContainer>
      <ProTable
        size="small"
        headerTitle="链接分类管理"
        search={false}
        toolBarRender={() => [
          <LinkCategoryModal
            key="link-category-modal-create"
            record={{}}
            fetcher={fetcher}
          />,
        ]}
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "name",
            title: "链接分类名",
            render(_, record) {
              return <LinkTag record={record} />;
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
                  <LinkCategoryModal
                    key="link-category-modal-modify"
                    record={record}
                    fetcher={fetcher}
                  />
                  <DeleteIt record={record} fetcher={fetcher} title="删除" />
                </Space>
              );
            },
          },
        ]}
      />
    </PageContainer>
  );
}

function LinkTag({ record }: any) {
  const { lang } = useParams();
  return (
    <Link to={`/${lang}/admin/profile/link/category/${record?.id}`}>
      <Tag color="blue">{record?.name}</Tag>
    </Link>
  );
}
