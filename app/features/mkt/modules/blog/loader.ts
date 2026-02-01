import type { Op } from "@/types/restful";
import { blogDAL } from "@/dals/blog/BlogDAL";
import { remixApi } from "@/utils/server/remixApi";
import { getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: true,
    perm: "",
    handler: async (args: any) => {
      const page = getSearchParamsPage(args.request);
      const pageSize = getSearchParamsPageSize(args.request);
      const total = await blogDAL.getCount();
      const list = await blogDAL.getPage({ page, pageSize });
      return { total, list };
    },
  },
};

export const { loader } = remixApi.createApi(options);
