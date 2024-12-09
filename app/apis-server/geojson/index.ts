import { remixApi } from "~/utils/server/remixApi";

export async function readGeoJsonService() {
  const geoJson = (
    await import("../../__mock__/db/dashboard/monitor/100000.geoJson.json")
  ).default;
  return geoJson;
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
