import { json } from "@remix-run/node";

export const loader = async () => {
  const geoJson = (
    await import("../__mock__/db/dashboard/monitor/100000.geoJson.json")
  ).default;
  return json(geoJson);
};
