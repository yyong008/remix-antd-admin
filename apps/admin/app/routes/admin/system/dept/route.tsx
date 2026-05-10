import { PageContainer } from "~/components/page-container";
import { DeptProTable } from "./components/DeptProTable";
import { useDeptList } from "~/api-client/queries/system/system-dept";

export function Route() {
  const { data, isLoading, refetch } = useDeptList({
    page: 1,
    pageSize: 1000,
  });

  return (
    <PageContainer>
      <DeptProTable
        list={data?.data?.list ?? []}
        loading={isLoading}
        refetch={refetch}
        total={data?.data?.total ?? 0}
      />
    </PageContainer>
  );
}
