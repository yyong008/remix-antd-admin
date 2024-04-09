// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";

// components
import { Space, Tag } from "antd";
import DeleteIt from "~/components/common/DeleteIt";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import NewsCategoryModal from "~/components/news/category-list/NewsCategoryModal";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";

// controller
import { AdminNewsCategoryController } from "~/controllers/admin.news.category.controller";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = AdminNewsCategoryController.action;
export const loader: LoaderFunction = AdminNewsCategoryController.loader;

export default function NewsCategoryWithIdList() {
  const { dataSource } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();
  const { lang } = useParams();

  return (
    <PageContainer>
      <ProTable
        size="small"
        headerTitle="新闻分类"
        search={false}
        toolBarRender={() => [
          <NewsCategoryModal
            key="news-category-modal-create"
            record={{}}
            fetcher={fetcher}
          />,
        ]}
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "name",
            title: "新闻分类名",
            render(_, record) {
              return (
                <Link to={`/${lang}/admin/news/category/${record.id}`}>
                  <Tag color="blue">{record.name}</Tag>
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
                  <NewsCategoryModal
                    key="news-category-modal-modify"
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
      <Outlet />
    </PageContainer>
  );
}
