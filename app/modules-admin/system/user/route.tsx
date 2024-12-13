import { PageContainer } from "@ant-design/pro-components";
import { UserProTable } from "./components";
import { useReadRoleListQuery } from "@/apis-client/admin/system/role/role";
import { useReadUserListQuery } from "@/apis-client/admin/system/user";
import { useReadsystemDeptListQuery } from "@/apis-client/admin/system/dept";
import { useState } from "react";

export function Route() {
  const longPage = { page: 1, pageSize: 10000 };
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    name: "",
  });
  const { data, isLoading, refetch } = useReadUserListQuery(page);
  const { data: depts } = useReadsystemDeptListQuery(longPage);
  const { data: roles } = useReadRoleListQuery(longPage);

  return (
    <PageContainer>
      <UserProTable
        {...{
          data,
          isLoading,
          refetch,
          depts: depts?.data?.list || [],
          roles: roles?.data?.list || [],
          page,
          setPage,
        }}
      />
    </PageContainer>
  );
}
