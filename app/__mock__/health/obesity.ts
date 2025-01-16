import { data, op_data } from "~/__mock__/db/health/obesity";
import { delay, of } from "rxjs";

export const getObesityData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
