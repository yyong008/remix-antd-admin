import { data, op_data } from "~/__mock__/db/health/vision";
import { delay, of } from "rxjs";

export const getVisionData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
