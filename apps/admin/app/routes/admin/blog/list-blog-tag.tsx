import { PageContainer } from "~/components/page-container";
import { AdminTable } from "~/components/admin-table";
import { useBlogTagList } from "~/api-client/queries/blog/blog-tag";
import type { MetaFunction } from "react-router";

import { CreateBlogTagModal } from "./tag/components/create-blog-tag-modal";
import { createColumns } from "./tag/components/create-columns";

export const meta: MetaFunction = () => [{ title: "Blog · tags" }];

export function Route() {
  const { data, isLoading, refetch } = useBlogTagList({
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
        toolBarRender={() => [<CreateBlogTagModal key="create" refetch={refetch} />]}
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
