import { of, delay } from "rxjs";
import { data, op_data } from "~/db/health/cervical-vertebra";

export const getCervicalData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
