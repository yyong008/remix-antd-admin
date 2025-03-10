import { useMemo, useState } from "react";

import { MenuProTable } from "./components/MenuProTable";
import { PageContainer } from "@ant-design/pro-components";
import { useParams } from "react-router";

function removeType3(data: any[]) {
  return data
    .filter((item) => item.type !== 3)
    .map((item) => {
      if (item.children && item.children.length > 0) {
        item.children = removeType3(item.children); // 递归处理子节点
      }
      return item;
    });
}

export function Route() {
  const { lang } = useParams();
  const [] = useState({
    page: 1,
    pageSize: 10,
    lang,
  });
  const { data, isLoading, refetch } = {
    data: { data: { list: [], total: 0 } },
    isLoading: false,
    refetch: () => {},
  };
  const menuTreeData = JSON.parse(JSON.stringify(data?.data?.list || []));
  const menuTreeDataNotPerm = useMemo(() => {
    return removeType3(JSON.parse(JSON.stringify(menuTreeData)) || []);
  }, [menuTreeData]);
  return (
    <PageContainer>
      <MenuProTable
        menuRaw={menuTreeData}
        loading={isLoading}
        menuNotPerm={menuTreeDataNotPerm!}
        refetch={refetch}
        total={data?.data?.total}
      />
    </PageContainer>
  );
}
