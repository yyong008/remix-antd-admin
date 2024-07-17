import { PageContainer, ProTable } from "@ant-design/pro-components";

import { ButtonLink } from "@/components/common";
import { createMaiListColumns } from "./components/mail-list-columns-create";
import { useMailNav } from "@/hooks";
import { useMemo } from "react";
import { useParams } from "@remix-run/react";

export function Route() {
  const [navMail] = useMailNav();
  const { lang } = useParams();

  const columns = useMemo(() => {
    return createMaiListColumns(lang!);
  }, [lang]);

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="登录记录"
        rowKey="id"
        showSorterTooltip
        dataSource={[]}
        toolBarRender={() => [
          <ButtonLink
            key="create-mail"
            to={`/${lang!}/admin/tools/mail`}
            type={"new"}
            content="去新建"
          />,
        ]}
        columns={columns as any}
        pagination={{
          total: 0,
          pageSize: 10,
          onChange(page, pageSize) {
            navMail({
              page,
              pageSize,
            });
          },
        }}
      />
    </PageContainer>
  );
}
