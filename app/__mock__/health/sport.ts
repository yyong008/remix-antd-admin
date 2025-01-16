import { data, op_data } from "~/__mock__/db/health/sport";
import { delay, of } from "rxjs";

export const getSportData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
