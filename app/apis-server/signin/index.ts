import { api, createApi } from "@/utils/server/api";

import { signInAction } from "./signin-action";

const options = {
  POST: {
    isPublic: true,
    perm: "",
  },
};

const restfulApis = {
  POST: await createApi(options.POST, signInAction),
};

export const { action } = api(restfulApis);
