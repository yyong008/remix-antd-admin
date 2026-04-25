import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/api-client/parse-rsj";

export const publicNewsCategoryKeys = {
  list: () => ["public-news-category", "list"] as const,
};

export type PublicNewsCategoryRow = {
  id: string;
  name: string;
  description?: string | null;
  visible?: boolean;
};

export type PublicNewsCategoryListData = {
  total: number;
  list: PublicNewsCategoryRow[];
};

export function usePublicNewsCategoryList() {
  return useQuery({
    queryKey: publicNewsCategoryKeys.list(),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.news.category.$get();
      return parseRsj<PublicNewsCategoryListData>(res);
    },
  });
}
