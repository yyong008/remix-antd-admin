import { Link, Outlet, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

import { DeleteIt } from "./components/delete-it";
import { NewsCategoryModalCreate } from "./components/news-category-modal-create";
import { NewsCategoryModalUpdate } from "./components/news-category-modal-update";
import { useReadNewsCategoryListQuery } from "@/apis-client/admin/news/category";
import { useState } from "react";

export function Route() {
  const { lang } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadNewsCategoryListQuery(page);

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        headerTitle="新闻分类"
        search={false}
        loading={isLoading}
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total,
          pageSize: 10,
          onChange(page, pageSize) {
            setPage({
              page,
              pageSize,
            });
          },
        }}
        toolBarRender={() => [
          <NewsCategoryModalCreate
            key="news-category-modal-create"
            refetch={refetch}
          />,
        ]}
        dataSource={data?.data?.list}
        columns={[
          {
            dataIndex: "name",
            title: "新闻分类名",
            render(_, record: any) {
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
                  <NewsCategoryModalUpdate
                    key="news-category-modal-modify"
                    record={record}
                    refetch={refetch}
                  />
                  <DeleteIt record={record} refetch={refetch} title="删除" />
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
