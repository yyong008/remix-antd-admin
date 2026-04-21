import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Empty,
  Flex,
  Space,
  Typography,
  Input,
  Skeleton,
  Dropdown,
  type MenuProps,
  Modal,
} from "antd";
import { href, useParams, useSearchParams } from "react-router";
import {
  FolderOutlined,
  ReloadOutlined,
  SearchOutlined,
  FileTextOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useNewsCategoryList, useDeleteNewsCategory } from "~/api-client/queries/news-category";
import { useNewsList } from "~/api-client/queries/news";
import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { ButtonLink } from "@/components/common";
import { isNewsCategoryVisible } from "../news-category-select";
import { createColumns } from "./components/createColumns";
import { CreateNewsCategoryModal } from "../category/components/CreateNewsCategoryModal";
import { UpdateNewsCategoryModal } from "../category/components/UpdateNewsCategoryModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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

  const categories = catPayload?.list;

  const sidebarCategories = useMemo(() => categories ?? [], [categories]);

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

  const categoryById = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of categories ?? []) {
      m.set(c.id, c.name);
    }
    return m;
  }, [categories]);

  useEffect(() => {
    setPage((p) => ({ ...p, page: 1 }));
  }, [categoryId, search]);

  const setCategoryFilter = (id?: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (id) next.set("category", id);
        else next.delete("category");
        return next;
      },
      { replace: true },
    );
    setPage((p) => ({ ...p, page: 1 }));
  };

  const selectedCategory = categories?.find((c) => c.id === categoryId);

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
          gridTemplateColumns: "280px 1fr",
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
          styles={{ body: { height: "100%", padding: 0 } }}
          extra={<CreateNewsCategoryModal refetch={refetchCategories} />}
        >
          <div style={{ height: "100%", overflowY: "auto", padding: "8px 4px" }}>
            <Space direction="vertical" size={1} style={{ width: "100%" }}>
              <Button
                block
                type={!categoryId ? "primary" : "default"}
                onClick={() => setCategoryFilter(undefined)}
                icon={<FileTextOutlined />}
              >
                全部
                <span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.6 }}>
                  {newsData?.total ?? 0}
                </span>
              </Button>
              {catLoading ? (
                <Skeleton active paragraph={false} />
              ) : (sidebarCategories?.length ?? 0) === 0 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无分类" />
              ) : (
                (sidebarCategories ?? []).map((cat) => (
                  <Flex
                    key={cat.id}
                    align="center"
                    justify="space-between"
                    gap={2}
                    wrap="nowrap"
                    style={{ paddingInline: 4 }}
                  >
                    <Button
                      block
                      size="small"
                      type={categoryId === cat.id ? "primary" : "text"}
                      style={{
                        flex: 1,
                        textAlign: "left",
                        fontWeight: categoryId === cat.id ? 600 : 400,
                      }}
                      onClick={() => setCategoryFilter(cat.id)}
                    >
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: 13,
                          display: "block",
                        }}
                      >
                        {cat.name}
                      </span>
                    </Button>
                    <CategoryActionsCell cat={cat} refetch={refetchCategories} />
                  </Flex>
                ))
              )}
            </Space>
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
