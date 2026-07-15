import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { Alert, Button, Card, Empty, Spin, Typography, message, theme } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { MetaFunction } from "react-router";

import {
  useProfileLinkCategoryList,
  useDeleteProfileLinkCategory,
} from "~/api-client/queries/profile/profile-link-category";
import { useProfileLinkList } from "~/api-client/queries/profile/profile-link";
import { m } from "~/paraglide/messages";

import { CreateLinkCategoryModal } from "./category/components/create-link-category-modal";
import { UpdateLinkCategoryModal } from "./category/components/update-link-category-modal";
import { createColumns as createCategoryColumns } from "./category/components/create-columns";
import { createColumns as createLinkColumns } from "./components/create-columns";
import { CreateLinkModal } from "./components/create-link-modal";

export const handle = () => ({
  breadcrumb: [{ label: m.profile_link_title() }],
});

export const meta: MetaFunction = () => [{ title: "Profile · links" }];

function idKey(v: unknown) {
  return v == null ? null : String(v);
}

export default function Page() {
  const { token } = theme.useToken();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const {
    data: catData,
    isLoading: catLoading,
    isError: catError,
    error: catErr,
    refetch: refetchCategories,
  } = useProfileLinkCategoryList({ page: 1, pageSize: 500 });

  const [updateCategory, setUpdateCategory] = useState<{
    id: string;
    name: string;
    description?: string;
  } | null>(null);
  const deleteMutation = useDeleteProfileLinkCategory();

  const categories = catData?.list ?? [];

  const selectedCategory = useMemo(
    () => categories.find((c) => idKey(c.id) === idKey(selectedCategoryId)) ?? null,
    [categories, selectedCategoryId],
  );

  useEffect(() => {
    if (!categories.length) {
      setSelectedCategoryId(null);
      return;
    }
    setSelectedCategoryId((prev) => {
      const p = idKey(prev);
      if (p && categories.some((c) => idKey(c.id) === p)) return p;
      return idKey(categories[0]?.id);
    });
  }, [categories]);

  const {
    data: linkData,
    isLoading: linkLoading,
    isError: linkError,
    error: linkErr,
    refetch: refetchLinks,
  } = useProfileLinkList(
    {
      page: 1,
      pageSize: 100,
      category: idKey(selectedCategoryId) ?? undefined,
    },
    { enabled: selectedCategoryId != null },
  );

  const linkList = linkData?.list ?? [];

  const refetchAll = useCallback(() => {
    refetchCategories();
    refetchLinks();
  }, [refetchCategories, refetchLinks]);

  const handleDeleteCategory = useCallback(
    async (record: { id: string }) => {
      try {
        await deleteMutation.mutateAsync({ ids: [record.id] });
        message.success(m.profile_link_toast_deleted());
        if (idKey(record.id) === idKey(selectedCategoryId)) {
          setSelectedCategoryId(null);
        }
        refetchAll();
      } catch (e) {
        message.error(e instanceof Error ? e.message : m.profile_link_toast_delete_failed());
      }
    },
    [deleteMutation, refetchAll, selectedCategoryId],
  );

  const categoryColumns = useMemo(
    () =>
      createCategoryColumns({
        onUpdate: (record) => setUpdateCategory(record),
        onDelete: handleDeleteCategory,
      }),
    [handleDeleteCategory],
  );

  const linkColumns = useMemo(
    () =>
      createLinkColumns({
        refetch: refetchLinks,
        categoryId: selectedCategoryId ?? "",
      }),
    [refetchLinks, selectedCategoryId],
  );

  const pageSubTitle = selectedCategory
    ? m.profile_link_subtitle_chosen({ name: selectedCategory.name ?? "" })
    : m.profile_link_subtitle_empty();

  const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));

  return (
    <PageContainer title={m.profile_link_title()} subTitle={pageSubTitle}>
      {catError ? (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message={m.profile_link_category_load_failed()}
          description={errMsg(catErr)}
          action={
            <Button type="link" size="small" onClick={() => void refetchCategories()}>
              {m.profile_link_retry()}
            </Button>
          }
        />
      ) : null}
      {linkError && selectedCategoryId ? (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message={m.profile_link_link_load_failed()}
          description={errMsg(linkErr)}
          action={
            <Button type="link" size="small" onClick={() => void refetchLinks()}>
              {m.profile_link_retry()}
            </Button>
          }
        />
      ) : null}
      <div style={{ display: "flex", minHeight: 480, gap: 16 }}>
        <Card
          size="small"
          style={{
            width: 280,
            flexShrink: 0,
            borderColor: token.colorPrimaryBorder,
            alignSelf: "stretch",
          }}
          title={
            <span>
              {m.profile_link_category_card_title()}
              {categories.length > 0 ? (
                <Typography.Text
                  type="secondary"
                  style={{ marginLeft: 8, fontSize: 12, fontWeight: 400 }}
                >
                  {m.profile_link_category_count({ count: categories.length })}
                </Typography.Text>
              ) : null}
            </span>
          }
          styles={{ body: { padding: 12, overflowY: "auto" } }}
          extra={
            <CreateLinkCategoryModal
              refetch={refetchAll}
              onCreated={(id) => setSelectedCategoryId(idKey(id))}
            />
          }
        >
          <Spin spinning={catLoading}>
            {categories.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={m.profile_link_category_empty()}
              />
            ) : (
              <AdminTable
                rowKey="id"
                size="small"
                search={false}
                options={false}
                pagination={false}
                showHeader={false}
                dataSource={categories}
                columns={categoryColumns}
                onRow={(record) => ({
                  onClick: () => setSelectedCategoryId(idKey(record.id)),
                  style:
                    idKey(record.id) === idKey(selectedCategoryId)
                      ? { background: token.colorPrimaryBg }
                      : undefined,
                })}
              />
            )}
          </Spin>
          <UpdateLinkCategoryModal
            record={updateCategory ?? { id: "", name: "", description: "" }}
            refetch={refetchAll}
            open={updateCategory != null}
            onClose={() => setUpdateCategory(null)}
          />
        </Card>

        <Card
          size="small"
          style={{
            flex: 1,
            borderColor: selectedCategoryId ? token.colorPrimaryBorder : undefined,
          }}
          styles={{ body: { padding: 0 } }}
        >
          {!selectedCategoryId ? (
            <Empty style={{ paddingTop: 48 }} description={m.profile_link_link_empty()} />
          ) : (
            <AdminTable
              rowKey="id"
              size="small"
              search={false}
              loading={linkLoading}
              options={false}
              dataSource={linkList}
              columns={linkColumns}
              toolBarRender={() => [
                <CreateLinkModal
                  key="link-create"
                  categoryId={selectedCategoryId}
                  refetch={refetchLinks}
                />,
              ]}
              pagination={false}
            />
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
