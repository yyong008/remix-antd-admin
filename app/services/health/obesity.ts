import { of, delay } from "rxjs";
import { data, op_data } from "~/db/health/obesity";

export const getObesityData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
