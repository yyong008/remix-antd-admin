import { useQuery } from "@tanstack/react-query";
import { apiGet } from "~/utils/request";

export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  newsId: string;
  publishedAt: string;
  source?: string;
  categoryName?: string;
}

interface NewsListResponse {
  total: number;
  list: News[];
}

interface Category {
  id: string;
  name: string;
}

interface CategoryListResponse {
  total: number;
  list: Category[];
}

async function fetchNewsList(params?: { page: number; pageSize: number }): Promise<NewsListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
  const query = searchParams.toString();
  return apiGet<NewsListResponse>(`/news/${query ? `?${query}` : ""}`);
}

async function fetchNewsById(id: string): Promise<News> {
  return apiGet<News>(`/news/${id}`);
}

async function fetchNewsCategoryList(): Promise<CategoryListResponse> {
  return apiGet<CategoryListResponse>("/news/category");
}

export function usePublicNewsList(params?: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: ["public-news-list", params],
    queryFn: () => fetchNewsList(params),
    select: (data) => ({ list: data.list, total: data.total }),
  });
}

export function usePublicNewsById(id?: string) {
  return useQuery({
    queryKey: ["public-news-by-id", id],
    queryFn: () => fetchNewsById(id!),
    enabled: !!id,
  });
}

export function usePublicNewsCategoryList() {
  return useQuery({
    queryKey: ["public-news-category-list"],
    queryFn: fetchNewsCategoryList,
    select: (data) => ({ list: data.list, total: data.total }),
  });
}
