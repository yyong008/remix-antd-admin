import { delay, of } from "rxjs";

// import { geoJson } from "~/__mock__/db/dashboard/monitor/map";
import { data as activeMonitorData } from "~/__mock__/db/dashboard/monitor/active-monitor";
import { gaugeData } from "~/__mock__/db/dashboard/monitor/gauge";

export const getMonitorData$ = () => {
  return of({
    geoJson: {},
    activeMonitorData,
    gaugeData,
  }).pipe(delay(20));
};
