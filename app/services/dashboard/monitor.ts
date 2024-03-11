import { of, delay } from "rxjs";

import { geoJson } from "~/db/dashboard/monitor/map";
import { data as activeMonitorData } from "~/db/dashboard/monitor/active-monitor";
import { gaugeData } from "~/db/dashboard/monitor/gauge";

export const getMonitorData$ = () => {
  return of({
    geoJson,
    activeMonitorData,
    gaugeData,
  }).pipe(delay(20));
};
