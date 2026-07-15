import { PageContainer } from "~/components/page-container";
import { DeptProTable } from "./components/dept-pro-table";
import { useDeptList } from "~/api-client/queries/system/system-dept";
import { m } from "~/paraglide/messages";
import type { MetaFunction } from "react-router";

export const handle = () => ({
  breadcrumb: [{ label: m.system_dept_title() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.system_dept_title() }];
};

export default function Route() {
  const { data, isLoading, refetch } = useDeptList({ page: 1, pageSize: 1000 });

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
