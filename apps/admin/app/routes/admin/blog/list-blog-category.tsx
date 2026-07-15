import { PageContainer } from "~/components/page-container";
import { AdminTable } from "~/components/admin-table";
import { useBlogCategoryList } from "~/api-client/queries/blog/blog-category";
import type { MetaFunction } from "react-router";

import { CreateBlogCategoryModal } from "./category/components/create-blog-category-modal";
import { createColumns } from "./category/components/create-columns";

export const meta: MetaFunction = () => [{ title: "Blog · categories" }];

export function Route() {
  const { data, isLoading, refetch } = useBlogCategoryList({
    page: 1,
    pageSize: 50,
  });

  return (
    <PageContainer>
      <AdminTable
        rowKey="id"
        size="small"
        loading={isLoading}
        dataSource={data?.list ?? []}
        toolBarRender={() => [<CreateBlogCategoryModal key="create" refetch={refetch} />]}
        columns={createColumns({ refetch })}
        options={{ reload: refetch }}
        pagination={{
          total: data?.total ?? 0,
          pageSize: 50,
          showSizeChanger: false,
        }}
      />
    </PageContainer>
  );
}

export default function Page() {
  return <Route />;
}
