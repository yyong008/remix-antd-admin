import { createToolsStorage$ } from "./action";
import { remixApi } from "~/utils/server/remixApi";

const createToolsStorageService = (args: any) => {
  return createToolsStorage$(args);
};

const options = {
  POST: {
    isPublic: true,
    // perm: perm.CREATE,
    handler: createToolsStorageService,
  },
};

export const { loader } = remixApi.createApi(options);
