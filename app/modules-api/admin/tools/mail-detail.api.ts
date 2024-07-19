import { api } from "@/utils/server/api";
import { createApi } from "@/utils/server/api/api-handler";
import { readMailTemplateByIdService } from "@/services/admin/tools/mail.api";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
  },
};

const restfulApis = {
  GET: await createApi(options.GET, readMailTemplateByIdService),
};

export const { loader, action } = api(restfulApis);
