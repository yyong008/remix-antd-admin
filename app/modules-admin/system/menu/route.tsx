import { MenuProTable } from "./components/MenuProTable";
import { PageContainer } from "@ant-design/pro-components";
import { useParams } from "@remix-run/react";
import { useReadMenuListQuery } from "~/apis-client/admin/system/menu";
import { useState } from "react";

export function Route() {
  const { lang } = useParams();
  const [page] = useState({
    page: 1,
    pageSize: 10,
    lang,
  });
  const { menuNotPerm = [] } = {};
  const { data, isLoading, refetch } = useReadMenuListQuery(page);
  return (
    <PageContainer>
      <MenuProTable
        menuRaw={data?.data?.list}
        loading={isLoading}
        menuNotPerm={menuNotPerm!}
        reload={refetch}
        total={data?.data?.total}
      />
    </PageContainer>
  );
}
