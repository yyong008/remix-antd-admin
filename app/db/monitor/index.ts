import { of, delay } from "rxjs";
import { geoJson } from "./map";
import { data as activeMonitorData } from "~/db/monitor/active-monitor";
import { gaugeData } from "~/db/monitor/gauge";

export const getMonitorData = () => {
  return of({
    geoJson,
    activeMonitorData,
    gaugeData,
  }).pipe(delay(20));
};
