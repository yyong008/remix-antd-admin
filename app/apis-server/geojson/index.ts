import { api } from "@/utils/server/api";
import { createApi } from "@/utils/server/api/api-handler";

const options = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
  },
};

export async function readGeoJsonService() {
  const geoJson = (
    await import("../../__mock__/db/dashboard/monitor/100000.geoJson.json")
  ).default;
  return geoJson;
}

const restfulApis = {
  GET: await createApi(options.GET, readGeoJsonService),
};

export const { loader } = api(restfulApis);
