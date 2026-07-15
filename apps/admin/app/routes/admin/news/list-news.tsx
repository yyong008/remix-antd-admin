import { useEffect, useMemo, useState } from "react";
import { Button, Card, Dropdown, Empty, Flex, Input, Modal, Table, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  MoreOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { href, useParams, useSearchParams } from "react-router";
import type { MetaFunction } from "react-router";

import {
  useDeleteNewsCategory,
  useNewsCategoryList,
} from "~/api-client/queries/news/news-category";
import { useNewsList } from "~/api-client/queries/news/news";
import { AdminTable } from "~/components/admin-table";
import { ButtonLink } from "~/components/common";
import { PageContainer } from "~/components/page-container";
import { m } from "~/paraglide/messages";

import { CreateNewsCategoryModal } from "./category/components/CreateNewsCategoryModal";
import { UpdateNewsCategoryModal } from "./category/components/UpdateNewsCategoryModal";
import { isNewsCategoryVisible } from "./news-category-select";
import { createColumns } from "./list-news/create-columns";

export const meta: MetaFunction = () => [{ title: "News · list" }];

function CategoryActionsCell({ cat, refetch }: { cat: { id: string }; refetch: () => void }) {
  const [editOpen, setEditOpen] = useState(false);
  const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteNewsCategory();

  const handleDelete = () => {
    Modal.confirm({
      title: m.news_action_confirm_delete_category(),
      okText: m.news_category_create_button(),
      cancelText: m.news_category_cancel_button(),
      async onOk() {
        try {
          await deleteCategory({ ids: [cat.id] });
          refetch();
          Modal.success({ title: m.news_category_toast_deleted() });
        } catch (e) {
          Modal.error({
            title: e instanceof Error ? e.message : m.news_category_toast_failed(),
          });
        }
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: m.news_action_edit(),
      onClick: () => setEditOpen(true),
    },
    { type: "divider" },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: m.news_action_delete(),
      danger: true,
      disabled: isDeleting,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" size="small" icon={<MoreOutlined />} />
      </Dropdown>
      <UpdateNewsCategoryModal
        record={cat}
        refetch={refetch}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}

export function Route() {
  const { locale } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category")?.trim() || undefined;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState({ page: 1, pageSize: 15 });

  const {
    data: catPayload,
    refetch: refetchCategories,
    isLoading: catLoading,
  } = useNewsCategoryList({
    page: 1,
    pageSize: 500,
  });

  const categories = catPayload?.list ?? [];

  const {
    data: newsData,
    isLoading: newsLoading,
    refetch,
  } = useNewsList({
    page: page.page,
    pageSize: page.pageSize,
    category: categoryId,
  });

  const filteredNews = useMemo(() => {
    if (!newsData?.list) return [];
    if (!search.trim()) return newsData.list;
    const lower = search.toLowerCase();
    return newsData.list.filter(
      (n: any) =>
        n.title?.toLowerCase().includes(lower) ||
        n.author?.toLowerCase().includes(lower) ||
        n.source?.toLowerCase().includes(lower),
    );
  }, [newsData?.list, search]);

  const displayedNews = useMemo(() => {
    if (!filteredNews.length) return [];
    const start = (page.page - 1) * page.pageSize;
    return filteredNews.slice(start, start + page.pageSize);
  }, [filteredNews, page.page, page.pageSize]);

  const categoryNewsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    const allNews = newsData?.list ?? [];
    for (const n of allNews) {
      if (n.newsId) {
        counts[n.newsId] = (counts[n.newsId] ?? 0) + 1;
      }
    }
    return counts;
  }, [newsData?.list]);

  const categoryById = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of categories) {
      m.set(c.id, c.name);
    }
    return m;
  }, [categories]);

  useEffect(() => {
    setPage((p) => ({ ...p, page: 1 }));
  }, [categoryId, search]);

  const toggleCategoryFilter = (id: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (categoryId === id) {
          next.delete("category");
        } else {
          next.set("category", id);
        }
        return next;
      },
      { replace: true },
    );
    setPage((p) => ({ ...p, page: 1 }));
  };

  const selectedCategory = categories.find((c) => c.id === categoryId);

  const categoryColumns = [
    {
      title: m.news_category_field_name(),
      dataIndex: "name",
      key: "name",
      render: (name: string, record: { id: string; visible?: unknown }) => (
        <Flex gap={6} align="center">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: isNewsCategoryVisible(record.visible) ? "#52c41a" : "#d9d9d9",
              flexShrink: 0,
            }}
            title={
              isNewsCategoryVisible(record.visible) ? m.news_list_visible() : m.news_list_hidden()
            }
          />
          <span>{name}</span>
        </Flex>
      ),
    },
    {
      title: m.news_list_column_category(),
      dataIndex: "id",
      key: "count",
      width: 80,
      render: (id: string) => categoryNewsCount[id] ?? 0,
    },
    {
      title: m.news_category_field_visible(),
      dataIndex: "visible",
      key: "visible",
      width: 80,
      render: (visible: unknown) =>
        isNewsCategoryVisible(visible) ? (
          <span style={{ color: "#52c41a" }}>{m.news_list_visible()}</span>
        ) : (
          <span style={{ color: "#d9d9d9" }}>{m.news_list_hidden()}</span>
        ),
    },
    {
      title: m.news_list_column_action(),
      key: "action",
      width: 60,
      render: (_: unknown, record: { id: string }) => (
        <CategoryActionsCell cat={record} refetch={refetchCategories} />
      ),
    },
  ];

  return (
    <PageContainer
      ghost
      style={{ display: "flex", flexDirection: "column", minHeight: "100%", minWidth: 0 }}
    >
      <div
        style={{
          display: "grid",
          width: "100%",
          minWidth: 0,
          flex: 1,
          alignItems: "stretch",
          gap: 16,
          gridTemplateColumns: "320px 1fr",
        }}
      >
        <Card
          size="small"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FolderOutlined style={{ color: "#eab308" }} />
              {m.news_list_sidebar_title()}
            </span>
          }
          styles={{ body: { padding: 0 } }}
          extra={<CreateNewsCategoryModal refetch={refetchCategories} />}
        >
          <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
            {catLoading ? (
              <Flex justify="center" style={{ padding: 24 }}>
                <Typography.Text type="secondary">{m.news_list_loading()}</Typography.Text>
              </Flex>
            ) : categories.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={m.news_list_empty_categories()}
              />
            ) : (
              <Table
                size="small"
                dataSource={categories}
                columns={categoryColumns}
                rowKey="id"
                pagination={false}
                rowClassName={(record) =>
                  categoryId === record.id ? "ant-table-row-selected" : ""
                }
                onRow={(record) => ({
                  onClick: () => toggleCategoryFilter(record.id),
                  style: { cursor: "pointer" },
                })}
              />
            )}
          </div>
        </Card>

        <Card
          size="small"
          title={
            <Typography.Text type="secondary">
              {selectedCategory
                ? m.news_list_category_count({
                    name: selectedCategory.name,
                    count: filteredNews.length,
                  })
                : m.news_list_all_count({ count: filteredNews.length })}
            </Typography.Text>
          }
          extra={
            <Flex gap={8}>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  void refetch();
                  void refetchCategories();
                }}
              >
                {m.news_list_action_refresh()}
              </Button>
              <ButtonLink
                type="new"
                content={m.news_list_action_new()}
                to={href(`/:locale?/admin/news/edit`, { locale })}
              />
            </Flex>
          }
        >
          <Flex vertical gap={8}>
            <Input
              placeholder={m.news_list_search_placeholder()}
              prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <AdminTable
              rowKey="id"
              size="small"
              tableLayout="fixed"
              bordered
              search={false}
              loading={newsLoading}
              options={false}
              dataSource={displayedNews ?? []}
              pagination={{
                total: filteredNews.length,
                current: page.page,
                pageSize: page.pageSize,
                showSizeChanger: true,
                showTotal: (total) => m.news_list_pagination_total({ total }),
                onChange(p, pageSize) {
                  setPage({
                    page: p,
                    pageSize: pageSize ?? page.pageSize,
                  });
                },
              }}
              columns={createColumns({ locale, refetch, categoryById }) as any}
            />
          </Flex>
        </Card>
      </div>
    </PageContainer>
  );
}

export default function Page() {
  return <Route />;
}
