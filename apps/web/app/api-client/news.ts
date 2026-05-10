import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost, apiPut, apiDelete } from "~/utils/request";

export interface News {
  id: string;
  title: string;
  content: string;
  author?: string | null;
  source?: string | null;
  viewCount: number;
  publishedAt: string;
  newsId: string;
  status: number;
}

export interface NewsCategory {
  id: string;
  name: string;
  description?: string | null;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsListParams {
  page?: number;
  pageSize?: number;
  category?: string;
}

export interface NewsListResponse {
  total: number;
  list: News[];
}

export interface CategoryListResponse {
  total: number;
  list: NewsCategory[];
}

export const newsKeys = {
  list: (params: NewsListParams) => ["news", "list", params] as const,
  detail: (id?: string) => ["news", "detail", id] as const,
  categoryList: (params: object) => ["news", "category", "list", params] as const,
};

export function useNewsList(params: NewsListParams) {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set("page", String(params.page));
      if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));
      if (params.category) searchParams.set("category", params.category);
      const query = searchParams.toString();
      return apiGet<NewsListResponse>(`/news/${query ? `?${query}` : ""}`);
    },
  });
}

export function useNewsById(id?: string) {
  return useQuery({
    queryKey: newsKeys.detail(id),
    enabled: Boolean(id),
    queryFn: () => apiGet<News>(`/news/${id}`),
  });
}

export function useNewsCategoryAll() {
  return useQuery({
    queryKey: newsKeys.categoryList({ all: true }),
    queryFn: () => apiGet<CategoryListResponse>("/news/category/all"),
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<News>) => {
      return apiPost<News>("/news", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<News>) => {
      return apiPut<News>("/news", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      return apiDelete<{ deleted: number }>("/news", { ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useToggleNewsStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return apiPut<News>("/news/toggle-status", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useCreateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; description?: string; visible?: boolean }) => {
      return apiPost<NewsCategory>("/news/category", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", "category"] });
    },
  });
}

export function useUpdateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; name: string; description?: string; visible?: boolean }) => {
      return apiPut<NewsCategory>("/news/category", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", "category"] });
    },
  });
}

export function useDeleteNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      return apiDelete<{ deleted: number }>("/news/category", { ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", "category"] });
    },
  });
}
