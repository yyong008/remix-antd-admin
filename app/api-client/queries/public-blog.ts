import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/api-client/parse-rsj";

export const publicBlogKeys = {
  list: () => ["public-blog", "list"] as const,
  detail: (id?: string) => ["public-blog", "detail", id] as const,
};

export type PublicBlogRow = {
  id: string;
  title: string;
  content: string;
  author?: string | null;
  source?: string | null;
  viewCount: number;
  publishedAt: string;
  categoryId: string;
  tagId: string;
};

export type PublicBlogListData = {
  total: number;
  list: PublicBlogRow[];
};

export function usePublicBlogList() {
  return useQuery({
    queryKey: publicBlogKeys.list(),
    queryFn: async () => {
      const res = await getApiClient().api.blog.$get();
      return parseRsj<PublicBlogListData>(res);
    },
  });
}

export function usePublicBlogById(id?: string) {
  return useQuery({
    queryKey: publicBlogKeys.detail(id),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getApiClient().api.blog[":id"].$get({
        param: { id: id! },
      });
      return parseRsj<PublicBlogRow>(res);
    },
  });
}
