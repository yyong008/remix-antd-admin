import { Link, useLoaderData, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";

import { DeleteIt } from "~/components/common";
import LinkCategoryModal from "~/modules/admin/profile/link-category/components/LinkCategoryModal";
import type { loader } from "./loader";
import { useFetcherChange } from "~/hooks";

export function Route() {
  const { data: dataSource } = useLoaderData<typeof loader>();
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
