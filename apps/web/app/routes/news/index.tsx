import { useState, useMemo } from "react";
import { href, useParams } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Input } from "@workspace/ui/components/input";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { IconSearch, IconFileText, IconCalendar, IconUser, IconFolder, IconChevronRight } from "@tabler/icons-react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { usePublicNewsList, usePublicNewsCategoryList } from "~/api-client/public-news";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@workspace/ui/components/pagination";
import { defaultLang } from "~/config/lang";
import * as m from "~/paraglide/messages.js";

dayjs.extend(relativeTime);

export const meta: MetaFunction = () => {
  return [{ title: m.news_page_title() }];
};

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function NewsItem(props: { data: any; categoryName?: string }) {
  const { data, categoryName } = props;
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;
  const excerpt = data.content ? stripHtml(data.content).slice(0, 120) + "..." : "";

  return (
    <div
      onClick={() => (window.location.href = href(`/:locale?/news/:id`, { locale, id: data.id }))}
      className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all hover:shadow-md"
    >
      {categoryName && (
        <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full whitespace-nowrap shrink-0">
          <IconFolder className="size-3" />
          {categoryName}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold mb-1 text-sm truncate">{data.title}</h3>
        {excerpt && <p className="text-xs text-muted-foreground truncate m-0">{excerpt}</p>}
      </div>
      <div className="flex items-center gap-3 text-xs shrink-0">
        {data.author && (
          <span className="flex items-center gap-1 max-w-[60px] truncate">
            <IconUser className="size-3" />
            <span className="truncate">{data.author}</span>
          </span>
        )}
        <span className="flex items-center gap-1">
          <IconCalendar className="size-3" />
          {dayjs(data.publishedAt).fromNow()}
        </span>
        <IconChevronRight className="size-3" />
      </div>
    </div>
  );
}

const PAGE_SIZE = 10;

export default function Route() {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { data: newsData, isLoading: newsLoading } = usePublicNewsList({
    page,
    pageSize: PAGE_SIZE,
  });
  const { data: categoryData, isLoading: categoryLoading } = usePublicNewsCategoryList();

  const categories = categoryData?.list ?? [];
  const allNews = newsData?.list ?? [];
  const total = newsData?.total ?? 0;

  const filteredNews = useMemo(() => {
    if (!category) return allNews;
    return allNews.filter((n: any) => n.newsId === category);
  }, [allNews, category]);

  const categoryNewsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of categories) {
      counts[c.id] = 0;
    }
    for (const n of allNews) {
      if (counts[n.newsId] !== undefined) {
        counts[n.newsId]++;
      }
    }
    return counts;
  }, [categories, allNews]);

  const selectedCategory = categories.find((c: any) => c.id === category);

  const getCategoryBtnClass = (isActive: boolean) =>
    `flex w-full items-center justify-between px-4 py-[10px] rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-500 text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)]"
        : "bg-transparent"
    }`;

  return (
    <div className="flex-1 min-h-full">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{m.news_center_title()}</h1>
          <p>
            {selectedCategory
              ? m.news_category_posts({ category: selectedCategory.name, count: filteredNews.length })
              : m.news_all_posts({ count: total })}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-5">
                <div className="relative mb-4">
                  <Input
                    placeholder={m.news_search_placeholder()}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="pr-8"
                  />
                  <IconSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3">{m.news_categories()}</p>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setCategory("");
                      setPage(1);
                    }}
                    className={getCategoryBtnClass(!category)}
                  >
                    <span>{m.news_all()}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">{total}</span>
                  </button>
                  {categoryLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    categories.map((cat: any) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCategory(cat.id);
                          setPage(1);
                        }}
                        className={getCategoryBtnClass(category === cat.id)}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                          {categoryNewsCount[cat.id] ?? 0}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {newsLoading ? (
              <div className="flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-[72px] rounded-lg" />
                ))}
              </div>
            ) : filteredNews.length <= 0 ? (
              <Card className="text-center p-12">
                <IconFileText className="size-12 mx-auto mb-4" />
                <p>{m.common_no_data()}</p>
              </Card>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {filteredNews.map((n: any) => (
                    <NewsItem key={n.id} data={n} categoryName={selectedCategory?.name} />
                  ))}
                </div>
                {total > PAGE_SIZE && (
                  <div className="mt-8 text-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.ceil(total / PAGE_SIZE) }, (_, i) => i + 1).map((p) => (
                          <PaginationItem key={p}>
                            <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setPage((p) => Math.min(Math.ceil(total / PAGE_SIZE), p + 1))}
                            className={page >= Math.ceil(total / PAGE_SIZE) ? "pointer-events-none opacity-50" : ""}
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
      </div>
    </div>
  );
}
