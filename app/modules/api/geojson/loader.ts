import * as ds from "~/decorators";

import { json } from "@remix-run/node";

class Loader {
  @ds.checkLogin()
  async loader() {
    const geoJson = (
      await import("../../../__mock__/db/dashboard/monitor/100000.geoJson.json")
    ).default;
    return json(geoJson);
  }
}

export const loader = new Loader().loader;
