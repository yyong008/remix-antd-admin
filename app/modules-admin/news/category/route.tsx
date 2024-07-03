import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

import { DeleteIt } from "~/components/common";
import NewsCategoryModal from "~/modules-admin/news/category/components/category-list/NewsCategoryModal";
import type { loader } from "./loader";
import { useFetcherChange } from "~/hooks";

export function Route() {
  const { data: dataSource } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();
  const { lang } = useParams();

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
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
