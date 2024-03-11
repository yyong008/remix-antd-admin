import { of, delay } from "rxjs";
import { data, op_data } from "~/db/health/hand";

export const gethandData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
