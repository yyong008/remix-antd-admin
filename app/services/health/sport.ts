import { of, delay } from "rxjs";
import { data, op_data } from "~/db/health/sport";

export const getSportData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
