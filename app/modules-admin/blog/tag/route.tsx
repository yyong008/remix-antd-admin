import { PageContainer, ProTable } from "@ant-design/pro-components";
import { blogTagColumnsCreate, blogTagToolBarRender } from "./components";

import { useParams } from "@remix-run/react";
import { useReadBlogTagListQuery } from "@/apis-client/admin/blog/tag";
import { useState } from "react";

export function Route() {
  const { lang } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadBlogTagListQuery(page);

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list}
        toolBarRender={() => blogTagToolBarRender(refetch)}
        columns={blogTagColumnsCreate(lang!, refetch)}
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total,
          pageSize: 10,
          onChange(page, pageSize) {
            setPage?.(() => ({ page, pageSize }));
          },
        }}
      />
    </PageContainer>
  );
}
