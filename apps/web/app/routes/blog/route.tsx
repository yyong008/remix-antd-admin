import { useState, useMemo } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { IconFileText } from "@tabler/icons-react";
import { Link } from "react-router";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@workspace/ui/components/pagination";
import { BlogItem } from "./components";
import { usePublicBlogList, usePublicBlogCategoryList } from "~/api-client/public-blog";
import * as m from "~/paraglide/messages.js";

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

const PAGE_SIZE = 9;

export function Route() {
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
      <div className="mx-auto max-w-5xl  px-6 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{m.blog_center_title()}</h1>
          <p>
            {selectedCategory
              ? m.blog_category_posts({ category: selectedCategory.name, count: filteredBlogs.length })
              : m.blog_all_posts({ count: filteredBlogs.length })}
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-6 p-4 rounded-xl">
          <button
            onClick={() => {
              setCategoryId("");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full border-none font-medium cursor-pointer transition-all ${
              !categoryId
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-transparent text-foreground"
            }`}
          >
            {m.blog_all()}
          </button>
          {categoryLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoryId(cat.id);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full border-none font-medium cursor-pointer transition-all ${
                  categoryId === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-transparent text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))
          )}
        </div>

        {blogLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredBlogs.length <= 0 ? (
          <Card className="text-center p-12">
            <IconFileText className="size-12 mx-auto mb-4" />
            <p>{m.common_no_data()}</p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedBlogs.map((b) => (
                <Link key={b.id} to={`/blog/${b.id}`} className="no-underline">
                  <BlogItem data={b} />
                </Link>
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
                    {Array.from({ length: Math.ceil(filteredBlogs.length / PAGE_SIZE) }, (_, i) => i + 1).map(
                      (p) => (
                        <PaginationItem key={p}>
                          <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage((p) => Math.min(Math.ceil(filteredBlogs.length / PAGE_SIZE), p + 1))}
                        className={page >= Math.ceil(filteredBlogs.length / PAGE_SIZE) ? "pointer-events-none opacity-50" : ""}
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
