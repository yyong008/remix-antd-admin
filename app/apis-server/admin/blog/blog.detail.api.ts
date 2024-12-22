import type { Op } from "@/types/restful";
import { blogService } from "@/services/admin/blog/BlogService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
// import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.blog.blog.READ,
    // schemas: {
    //   body: schemas.admin.blog.blog.READ,
    // },
    handler: blogService.getById,
  },
};

export const { loader } = remixApi.createApi(options);
