import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";

export const publicBlogCategoryKeys = {
  list: () => ["public-blog-category", "list"] as const,
};

export type PublicBlogCategoryRow = {
  id: string;
  name: string;
  description?: string | null;
};

export type PublicBlogCategoryListData = {
  total: number;
  list: PublicBlogCategoryRow[];
};

export function usePublicBlogCategoryList() {
  return useQuery({
    queryKey: publicBlogCategoryKeys.list(),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.blog.category.$get();
      return parseRsj<PublicBlogCategoryListData>(res);
    },
  });
}
