import { query } from "./query";
import { remixApi } from "@/utils/server/remixApi";

const options = {
  GET: {
    isPublic: false,
    perm: "",
    handler: query,
  },
};

export const { loader } = remixApi.createApi(options);
