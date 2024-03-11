import { of, delay } from "rxjs";
import { data, op_data } from "~/db/health/sleep";

export const getSleepData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
