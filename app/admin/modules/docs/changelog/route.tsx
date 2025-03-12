import { PageContainer, ProTable } from "@ant-design/pro-components";
import { ChangelogCreateModal } from "./components/ChangelogCreateModal";
import { useMemo } from "react";
import { getDocs } from "~/admin/apis/admin/docs";
import { createColunms } from "./components/createColunms";
import { useTranslation } from "react-i18next";
import { useSimplePage } from "~/hooks/useSimplePage";
import { useTableShowTotal } from "~/hooks/useTableShowTotal";

export function Route() {
  const { t } = useTranslation("docs");
  const showTotal = useTableShowTotal();
  const { page, setPage, isLoading, data, getPage } = useSimplePage(getDocs);

  const columns = useMemo(() => createColunms({ t, refetch: getPage }), [t]);

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        headerTitle={t("list.title")}
        size="small"
        search={false}
        dataSource={data?.list ?? []}
        loading={isLoading}
        columns={columns}
        toolBarRender={() => [
          <ChangelogCreateModal
            t={t}
            key="changelog-modal-create"
            refetch={getPage}
          />,
        ]}
        options={{
          reload: getPage,
        }}
        pagination={{
          total: data?.total,
          pageSize: Number(page.pageSize ?? 10),
          showTotal,
          onChange(page, pageSize) {
            setPage({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
