import { of, delay } from "rxjs";
import { data, op_data } from "~/__mock__/db/health/cervical-vertebra";

export const getCervicalData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
