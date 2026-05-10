import { useQuery } from "@tanstack/react-query";
import { apiGet } from "~/utils/request";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  categoryId: string;
  categoryName?: string;
  tagName?: string;
  isPublished: boolean;
  publishedAt: string;
  source?: string;
}

interface BlogListResponse {
  total: number;
  list: Blog[];
}

interface Category {
  id: string;
  name: string;
}

interface CategoryListResponse {
  total: number;
  list: Category[];
}

async function fetchBlogList(): Promise<BlogListResponse> {
  return apiGet<BlogListResponse>("/blog");
}

async function fetchBlogById(id: string): Promise<Blog> {
  return apiGet<Blog>(`/blog/${id}`);
}

async function fetchBlogCategoryList(): Promise<CategoryListResponse> {
  return apiGet<CategoryListResponse>("/blog/category");
}

export function usePublicBlogList() {
  return useQuery({
    queryKey: ["public-blog-list"],
    queryFn: fetchBlogList,
    select: (data) => ({ list: data.list, total: data.total }),
  });
}

export function usePublicBlogById(id?: string) {
  return useQuery({
    queryKey: ["public-blog-by-id", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });
}

export function usePublicBlogCategoryList() {
  return useQuery({
    queryKey: ["public-blog-category-list"],
    queryFn: fetchBlogCategoryList,
    select: (data) => ({ list: data.list, total: data.total }),
  });
}
