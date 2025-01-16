import { data, op_data } from "~/__mock__/db/health/hand";
import { delay, of } from "rxjs";

export const gethandData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
