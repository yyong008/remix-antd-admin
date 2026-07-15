import { useState, useMemo } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination";
import { usePublicBlogList, usePublicBlogCategoryList } from "~/api-client/public-blog";
import { PageHeader } from "~/components/page-header";
import { CategoryPills } from "~/components/category-pills";
import { EmptyState } from "~/components/empty-state";
import { BlogCard } from "~/components/blog-card";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.blog_page_title() }];
};

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

const PAGE_SIZE = 9;

export default function Route() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { data: blogData, isLoading: blogLoading } = usePublicBlogList();
  const { data: categoryData, isLoading: categoryLoading } = usePublicBlogCategoryList();

  const allBlogs = blogData?.list ?? [];
  const categories = categoryData?.list ?? [];

  const publishedBlogs = useMemo(() => allBlogs.filter((b) => b.isPublished), [allBlogs]);

  const filteredBlogs = useMemo(() => {
    if (!categoryId) return publishedBlogs;
    return publishedBlogs.filter((b) => b.categoryId === categoryId);
  }, [publishedBlogs, categoryId]);

  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBlogs.slice(start, start + PAGE_SIZE);
  }, [filteredBlogs, page]);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  return (
    <div className="flex-1 min-h-full">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <PageHeader
          title={m.blog_center_title()}
          description={
            selectedCategory
              ? m.blog_category_posts({
                  category: selectedCategory.name,
                  count: filteredBlogs.length,
                })
              : m.blog_all_posts({ count: filteredBlogs.length })
          }
        />

        <div className="mb-6">
          {categoryLoading ? (
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-20 rounded-full" />
              ))}
            </div>
          ) : (
            <CategoryPills
              options={categories}
              value={categoryId}
              onChange={(id) => {
                setCategoryId(id);
                setPage(1);
              }}
              allLabel={m.blog_all()}
            />
          )}
        </div>

        {blogLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="mb-4 h-32 w-full" />
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredBlogs.length <= 0 ? (
          <EmptyState text={m.common_no_data()} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {paginatedBlogs.map((b) => (
                <BlogCard key={b.id} data={b} />
              ))}
            </div>
            {filteredBlogs.length > PAGE_SIZE && (
              <div className="mt-8 text-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from(
                      { length: Math.ceil(filteredBlogs.length / PAGE_SIZE) },
                      (_, i) => i + 1,
                    ).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setPage((p) =>
                            Math.min(Math.ceil(filteredBlogs.length / PAGE_SIZE), p + 1),
                          )
                        }
                        className={
                          page >= Math.ceil(filteredBlogs.length / PAGE_SIZE)
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
