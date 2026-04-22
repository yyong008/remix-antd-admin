import { Button, Card, Flex, Input, Typography } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { href, useParams, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";

import { useBlogList } from "~/api-client/queries/blog";
import { useBlogCategoryList } from "~/api-client/queries/blog-category";
import { useBlogTagList } from "~/api-client/queries/blog-tag";
import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { ButtonLink } from "@/components/common";
import { BlogSidebar } from "./components/BlogSidebar";
import { createColumns } from "./components/createColumns";

export function Route() {
  const { locale } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category")?.trim() || undefined;
  const tagId = searchParams.get("tag")?.trim() || undefined;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState({ page: 1, pageSize: 15 });

  const { data: catPayload, refetch: refetchCategories } = useBlogCategoryList({
    page: 1,
    pageSize: 500,
  });
  const categories = useMemo(() => catPayload?.list ?? [], [catPayload?.list]);

  const { data: tagPayload, refetch: refetchTags } = useBlogTagList({
    page: 1,
    pageSize: 500,
  });
  const tags = useMemo(() => tagPayload?.list ?? [], [tagPayload?.list]);

  const {
    data: blogData,
    isLoading: blogLoading,
    refetch,
  } = useBlogList({
    page: page.page,
    pageSize: page.pageSize,
    categoryId: categoryId || undefined,
    tagId: tagId || undefined,
  });

  const filteredBlogs = useMemo(() => {
    if (!blogData?.list) return [];
    if (!search.trim()) return blogData.list;
    const lower = search.toLowerCase();
    return blogData.list.filter(
      (b: any) =>
        b.title?.toLowerCase().includes(lower) ||
        b.author?.toLowerCase().includes(lower) ||
        b.source?.toLowerCase().includes(lower),
    );
  }, [blogData?.list, search]);

  const displayedBlogs = useMemo(() => {
    if (!filteredBlogs.length) return [];
    const start = (page.page - 1) * page.pageSize;
    return filteredBlogs.slice(start, start + page.pageSize);
  }, [filteredBlogs, page.page, page.pageSize]);

  // Build category/tag counts from the full list for sidebar badges
  const categoryCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const b of filteredBlogs) {
      if (b.categoryId) {
        m.set(String(b.categoryId), (m.get(String(b.categoryId)) ?? 0) + 1);
      }
    }
    return m;
  }, [filteredBlogs]);

  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const b of filteredBlogs) {
      if (b.tagId) {
        m.set(String(b.tagId), (m.get(String(b.tagId)) ?? 0) + 1);
      }
    }
    return m;
  }, [filteredBlogs]);

  useEffect(() => {
    setPage((p) => ({ ...p, page: 1 }));
  }, [categoryId, tagId, search]);

  const setCategoryFilter = (id?: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (id) next.set("category", id);
        else next.delete("category");
        next.delete("tag");
        return next;
      },
      { replace: true },
    );
    setPage((p) => ({ ...p, page: 1 }));
  };

  const setTagFilter = (id?: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (id) next.set("tag", id);
        else next.delete("tag");
        next.delete("category");
        return next;
      },
      { replace: true },
    );
    setPage((p) => ({ ...p, page: 1 }));
  };

  const selectedCategory = categories.find((c) => String(c.id) === categoryId);
  const selectedTag = tags.find((t) => String(t.id) === tagId);

  const categoryById = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of categories) {
      m.set(String(c.id), c.name);
    }
    return m;
  }, [categories]);

  const tagById = useMemo(() => {
    const m = new Map<string, string>();
    for (const t of tags) {
      m.set(String(t.id), t.name);
    }
    return m;
  }, [tags]);

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
        <Card size="small" styles={{ body: { height: "100%", padding: 0 } }}>
          <BlogSidebar
            selectedCategoryId={categoryId}
            onCategorySelect={setCategoryFilter}
            selectedTagId={tagId}
            onTagSelect={setTagFilter}
            categoryCounts={categoryCounts}
            tagCounts={tagCounts}
          />
        </Card>

        <Card
          size="small"
          title={
            <Typography.Text type="secondary">
              {selectedTag
                ? `${selectedTag.name} · ${filteredBlogs.length} 篇`
                : selectedCategory
                  ? `${selectedCategory.name} · ${filteredBlogs.length} 篇`
                  : `全部博客 · ${filteredBlogs.length} 篇`}
            </Typography.Text>
          }
          extra={
            <Flex gap={8}>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  void refetch();
                  void refetchCategories();
                  void refetchTags();
                }}
              >
                刷新
              </Button>
              <ButtonLink
                type="new"
                content="编辑文章"
                to={href(`/:locale?/admin/blog/new`, { locale })}
              />
            </Flex>
          }
        >
          <Flex vertical gap={8}>
            <Input
              placeholder="搜索文章标题/作者/来源..."
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
              loading={blogLoading}
              options={false}
              dataSource={displayedBlogs ?? []}
              pagination={{
                total: filteredBlogs.length,
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
              columns={createColumns({ locale, refetch, categoryById, tagById }) as any}
            />
          </Flex>
        </Card>
      </div>
    </PageContainer>
  );
}
