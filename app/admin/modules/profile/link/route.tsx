import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

import { CreateLinkCategoryModal } from "./components/category/CreateLinkCategoryModal";
import { createColumns } from "./components/category/createColumns";
import { useState } from "react";
import { readProfileLinkCategory } from "~/admin/apis/admin/profile";
import { useSimplePage } from "~/hooks/useSimplePage";
import { LinkTable } from "./components/link/route";
import { useTranslation } from "react-i18next";

export function Route() {
  const {
    isLoading,
    getPage: refetch,
    data,
    page,
    setPage,
  } = useSimplePage(readProfileLinkCategory);
  const [selectedLinkCategory, setSelectedLinkCategory] = useState<any>(null);
  const { t } = useTranslation("link");
  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard colSpan="384px" ghost>
          <ProTable
            rowKey="id"
            size="small"
            headerTitle={t("category.list.title")}
            search={false}
            loading={isLoading}
            options={{
              reload: refetch,
            }}
            toolBarRender={() => [
              <CreateLinkCategoryModal
                refetch={refetch}
                key="link-category-modal-create"
              />,
            ]}
            dataSource={data?.list || []}
            columns={createColumns({ refetch })}
            rowClassName={(record) => {
              return record.id === selectedLinkCategory?.id
                ? "bg-gray-100"
                : "";
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  setSelectedLinkCategory(record);
                },
              };
            }}
            pagination={{
              total: data?.total,
              pageSize: page.pageSize || 10,
              onChange(_page, pageSize) {
                setPage({
                  page: _page,
                  pageSize,
                });
              },
            }}
          />
        </ProCard>
        <ProCard>
          <LinkTable
            categoryId={selectedLinkCategory?.id}
            categoryName={selectedLinkCategory?.name}
            setSelectedLinkCategory={setSelectedLinkCategory}
          />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
}
