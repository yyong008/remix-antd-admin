import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { Alert, Button, Card, Empty, Spin, message, theme, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useProfileLinkCategoryList,
  useUpdateProfileLinkCategory,
  useDeleteProfileLinkCategory,
} from "~/api-client/queries/profile-link-category";
import { useProfileLinkList } from "~/api-client/queries/profile-link";

import { CreateLinkCategoryModal } from "./components/CreateLinkCategoryModal";
import { UpdateLinkCategoryModal } from "./components/UpdateLinkCategoryModal";
import { createColumns as createCategoryColumns } from "./components/createColumns";
import { createColumns as createLinkColumns } from "../category-detail/components/createColumns";
import { LinkModalCreate } from "../category-detail/components/CreateLinkModal";

function idKey(v: unknown) {
  return v == null ? null : String(v);
}

export function Route() {
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
  const updateMutation = useUpdateProfileLinkCategory();
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
  const linkTotal = linkData?.total ?? 0;

  const refetchAll = useCallback(() => {
    refetchCategories();
    refetchLinks();
  }, [refetchCategories, refetchLinks]);

  const handleDeleteCategory = useCallback(
    async (record: { id: string }) => {
      const res = (await deleteMutation.mutateAsync({ ids: [record.id] })) as {
        code?: number;
        message?: string;
      };
      if (res.code !== 0) {
        message.error(res.message ?? "删除失败");
        return;
      }
      message.success("删除成功");
      refetchAll();
    },
    [deleteMutation, refetchAll],
  );

  const categoryColumns = useMemo(
    () =>
      createCategoryColumns({
        refetch: refetchAll,
        onUpdate: (record) => setUpdateCategory(record),
        onDelete: handleDeleteCategory,
      }),
    [refetchAll, handleDeleteCategory],
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
    ? `分类：${selectedCategory.name}`
    : "请先创建或选择左侧分类";

  const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));

  return (
    <PageContainer title="链接管理" subTitle={pageSubTitle}>
      {catError ? (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message="分类列表加载失败"
          description={errMsg(catErr)}
          action={
            <Button type="link" size="small" onClick={() => void refetchCategories()}>
              重试
            </Button>
          }
        />
      ) : null}
      {linkError && selectedCategoryId ? (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message="链接列表加载失败"
          description={errMsg(linkErr)}
          action={
            <Button type="link" size="small" onClick={() => void refetchLinks()}>
              重试
            </Button>
          }
        />
      ) : null}
      <div style={{ display: "flex", minHeight: 480, gap: 16 }}>
        <Card
          size="small"
          style={{ width: 280, flexShrink: 0, borderColor: token.colorPrimaryBorder }}
          title={
            <span>
              链接分类
              {categories.length > 0 ? (
                <Typography.Text
                  type="secondary"
                  style={{ marginLeft: 8, fontSize: 12, fontWeight: 400 }}
                >
                  （{categories.length}）
                </Typography.Text>
              ) : null}
            </span>
          }
          styles={{ body: { padding: 12 } }}
          extra={
            <CreateLinkCategoryModal
              refetch={refetchAll}
              onCreated={(id) => setSelectedCategoryId(idKey(id))}
            />
          }
        >
          <Spin spinning={catLoading}>
            {categories.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无分类，请先新建" />
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
            <Empty style={{ paddingTop: 48 }} description="请先选择左侧分类" />
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
                <LinkModalCreate
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
      <UpdateLinkCategoryModal
        record={updateCategory ?? { id: "", name: "", description: "" }}
        refetch={refetchAll}
        open={updateCategory != null}
        onClose={() => setUpdateCategory(null)}
      />
    </PageContainer>
  );
}
