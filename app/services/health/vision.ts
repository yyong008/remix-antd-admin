import { of, delay } from "rxjs";
import { data, op_data } from "~/db/health/vision";

export const getVisionData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
