import { useState, useMemo } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Input } from "@workspace/ui/components/input";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination";
import { usePublicNewsList, usePublicNewsCategoryList } from "~/api-client/public-news";
import { PageHeader } from "~/components/page-header";
import { EmptyState } from "~/components/empty-state";
import { NewsItem } from "~/components/news-item";
import { SearchIcon } from "~/components/icons";
import * as m from "~/paraglide/messages.js";

dayjs.extend(relativeTime);

export const meta: MetaFunction = () => {
  return [{ title: m.news_page_title() }];
};

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

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

  const searchedNews = useMemo(() => {
    if (!search.trim()) return filteredNews;
    const q = search.toLowerCase();
    return filteredNews.filter(
      (n: any) => n.title?.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q),
    );
  }, [filteredNews, search]);

  const categoryNewsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of categories) counts[c.id] = 0;
    for (const n of allNews) {
      if (counts[n.newsId] !== undefined) counts[n.newsId]++;
    }
    return counts;
  }, [categories, allNews]);

  const selectedCategory = categories.find((c: any) => c.id === category);

  const getCategoryBtnClass = (isActive: boolean) =>
    `flex w-full items-center justify-between rounded-lg px-4 py-[10px] font-medium transition-all duration-200 ${
      isActive
        ? "bg-brand-primary text-white shadow-[0_8px_24px_var(--brand-glow)]"
        : "bg-transparent text-foreground hover:bg-brand-surface"
    }`;

  return (
    <div className="flex-1 min-h-full">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <PageHeader
          title={m.news_center_title()}
          description={
            selectedCategory
              ? m.news_category_posts({
                  category: selectedCategory.name,
                  count: searchedNews.length,
                })
              : m.news_all_posts({ count: total })
          }
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-xl border border-border bg-card p-5">
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
                <SearchIcon className="absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {m.news_categories()}
              </p>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setCategory("");
                    setPage(1);
                  }}
                  className={getCategoryBtnClass(!category)}
                >
                  <span>{m.news_all()}</span>
                  <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/10">
                    {total}
                  </span>
                </button>
                {categoryLoading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  categories.map((cat: any) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        setPage(1);
                      }}
                      className={getCategoryBtnClass(category === cat.id)}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/10">
                        {categoryNewsCount[cat.id] ?? 0}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {newsLoading ? (
              <div className="flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-[72px] rounded-lg" />
                ))}
              </div>
            ) : searchedNews.length <= 0 ? (
              <EmptyState text={m.common_no_data()} />
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {searchedNews.map((n: any) => (
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
                        {Array.from({ length: Math.ceil(total / PAGE_SIZE) }, (_, i) => i + 1).map(
                          (p) => (
                            <PaginationItem key={p}>
                              <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
                                {p}
                              </PaginationLink>
                            </PaginationItem>
                          ),
                        )}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setPage((p) => Math.min(Math.ceil(total / PAGE_SIZE), p + 1))
                            }
                            className={
                              page >= Math.ceil(total / PAGE_SIZE)
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
      </div>
    </div>
  );
}
