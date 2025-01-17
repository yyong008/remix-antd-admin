import { remixApi } from "~/utils/server/remixApi";

export async function readGeoJsonService() {
  return {};
}
const options = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: readGeoJsonService,
  },
};

export const { loader } = remixApi.createApi(options);
