import { useState, useMemo } from "react";
import { href, Link, useParams } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconFileText, IconCalendar, IconUser, IconFolder } from "@tabler/icons-react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@workspace/ui/components/pagination";
import { usePublicBlogList, usePublicBlogCategoryList } from "~/api-client/public-blog";
import { defaultLang } from "~/config/lang";
import * as m from "~/paraglide/messages.js";

dayjs.extend(relativeTime);

export const meta: MetaFunction = () => {
  return [{ title: m.blog_page_title() }];
};

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function BlogItem(props: { data: any; featured?: boolean; categoryName?: string }) {
  const { data, featured = false, categoryName } = props;
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;
  const excerpt = data.content
    ? stripHtml(data.content).slice(0, featured ? 200 : 120) + "..."
    : "";

  return (
    <Card
      className="h-full rounded-xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => (window.location.href = href(`/:locale?/blog/:id`, { locale, id: data.id }))}
    >
      <CardContent className="p-0 h-full flex flex-col">
        {categoryName && (
          <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full mb-3 w-fit">
            <IconFolder className="size-3" />
            {categoryName}
          </div>
        )}
        <h3 className={`font-semibold mb-2 line-clamp-2 ${featured ? "text-lg" : "text-base"}`}>
          {data.title}
        </h3>
        {excerpt && (
          <p className={`text-muted-foreground mb-3 line-clamp-2 flex-1 ${featured ? "text-sm" : "text-xs"}`}>
            {excerpt}
          </p>
        )}
        <div className={`flex items-center gap-4 pt-3 mt-auto ${featured ? "text-[13px]" : "text-xs"}`}>
          {data.author && (
            <span className="flex items-center gap-1 max-w-[80px] truncate">
              <IconUser className="size-3" />
              <span>{data.author}</span>
            </span>
          )}
          {data.source && <span className="max-w-[80px] truncate">{data.source}</span>}
          <span className="flex items-center gap-1">
            <IconCalendar className="size-3" />
            {dayjs(data.publishedAt).fromNow()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

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
