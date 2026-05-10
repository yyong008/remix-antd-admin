import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Empty,
  Flex,
  Typography,
  Input,
  Table,
  Badge,
  Dropdown,
  type MenuProps,
  Modal,
} from "antd";
import { href, useParams, useSearchParams } from "react-router";
import {
  FolderOutlined,
  ReloadOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useNewsCategoryList, useDeleteNewsCategory } from "~/api-client/queries/news/news-category";
import { useNewsList } from "~/api-client/queries/news/news";
import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { ButtonLink } from "~/components/common";
import { createColumns } from "./components/createColumns";
import { CreateNewsCategoryModal } from "../category/components/CreateNewsCategoryModal";
import { UpdateNewsCategoryModal } from "../category/components/UpdateNewsCategoryModal";
import { isNewsCategoryVisible } from "../news-category-select";

function CategoryActionsCell({ cat, refetch }: { cat: any; refetch: () => void }) {
  const [editOpen, setEditOpen] = useState(false);
  const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteNewsCategory();

  const handleDelete = () => {
    Modal.confirm({
      title: "确定要删除该分类吗？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        try {
          await deleteCategory({ ids: [cat.id] });
          refetch();
          Modal.success({ title: "删除成功" });
        } catch (e) {
          Modal.error({ title: e instanceof Error ? e.message : "删除失败" });
        }
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "编辑",
      onClick: () => setEditOpen(true),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "删除",
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

  // Count news per category
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
      title: "分类名称",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <Flex gap={6} align="center">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: isNewsCategoryVisible(record.visible) ? "#52c41a" : "#d9d9d9",
              flexShrink: 0,
            }}
            title={isNewsCategoryVisible(record.visible) ? "展示中" : "已隐藏"}
          />
          <span>{name}</span>
        </Flex>
      ),
    },
    {
      title: "新闻数",
      dataIndex: "id",
      key: "count",
      width: 80,
      render: (id: string) => categoryNewsCount[id] ?? 0,
    },
    {
      title: "状态",
      dataIndex: "visible",
      key: "visible",
      width: 80,
      render: (visible: unknown) =>
        isNewsCategoryVisible(visible) ? (
          <span style={{ color: "#52c41a" }}>展示</span>
        ) : (
          <span style={{ color: "#d9d9d9" }}>隐藏</span>
        ),
    },
    {
      title: "操作",
      key: "action",
      width: 60,
      render: (_: unknown, record: any) => (
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
              新闻分类
            </span>
          }
          styles={{ body: { padding: 0 } }}
          extra={<CreateNewsCategoryModal refetch={refetchCategories} />}
        >
          <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
            {catLoading ? (
              <Flex justify="center" style={{ padding: 24 }}>
                <Typography.Text type="secondary">加载中...</Typography.Text>
              </Flex>
            ) : categories.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无分类" />
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
                ? `${selectedCategory.name} · ${filteredNews.length} 篇`
                : `全部新闻 · ${filteredNews.length} 篇`}
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
                刷新
              </Button>
              <ButtonLink
                type="new"
                content="新建新闻"
                to={href(`/:locale?/admin/news/edit`, { locale })}
              />
            </Flex>
          }
        >
          <Flex vertical gap={8}>
            <Input
              placeholder="搜索新闻标题/作者/来源..."
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
                showTotal: (total) => `共 ${total} 条`,
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
