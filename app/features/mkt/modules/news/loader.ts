import type { Op } from "@/types/restful";
import { newsDAL } from "@/dals/news/NewsDAL";
import { remixApi } from "@/utils/server/remixApi";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: true,
    perm: "",
    handler: async (args: any) => {
      const page = getSearchParamsPage(args.request);
      const pageSize = getSearchParamsPageSize(args.request);
      const category = Number(getSearchParams(args.request, "category") ?? 0);
      const total = await newsDAL.getCount();
      const list = category
        ? await newsDAL.getList({ page, pageSize, category })
        : await newsDAL.getPage({ page, pageSize });
      return { total, list };
    },
  },
};

export const { loader } = remixApi.createApi(options);
