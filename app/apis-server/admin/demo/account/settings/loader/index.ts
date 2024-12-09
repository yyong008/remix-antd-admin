import { query as settingsQuery } from "./query";
import { remixApi } from "@/utils/server/remixApi";

const options = {
  GET: {
    isPublic: false,
    perm: "",
    handler: settingsQuery,
  },
};

export const { loader } = remixApi.createApi(options);
