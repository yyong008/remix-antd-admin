import { Link, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

import { DeleteIt } from "./components/delete-it";
import { LinkCategoryModalCreate } from "./components/link-category-modal-create";
import { LinkCategoryModalUpdate } from "./components/link-category-modal-update";
import { useReadProfileLinkCategoryListQuery } from "@/apis-client/admin/profile/link-category";
import { useState } from "react";

export function Route() {
  const { id } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    category: id,
  });
  const { data, isLoading, refetch } =
    useReadProfileLinkCategoryListQuery(page);
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        headerTitle="链接分类管理"
        search={false}
        loading={isLoading}
        options={{
          reload: refetch,
        }}
        toolBarRender={() => [
          <LinkCategoryModalCreate key="link-category-modal-create" />,
        ]}
        dataSource={data?.data?.list || []}
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
                  <LinkCategoryModalUpdate
                    key="link-category-modal-modify"
                    record={record}
                    refetch={refetch}
                  />
                  <DeleteIt record={record} refetch={refetch} title="删除" />
                </Space>
              );
            },
          },
        ]}
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
