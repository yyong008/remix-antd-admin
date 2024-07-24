import { MenuProTable } from "./components/menu-pro-table";
import { PageContainer } from "@ant-design/pro-components";

export function Route() {
  const { menuRaw = [], menuNotPerm = [] } = {};
  return (
    <PageContainer>
      <MenuProTable
        menuRaw={menuRaw}
        fetcher={() => {}}
        menuNotPerm={menuNotPerm!}
      />
    </PageContainer>
  );
}
