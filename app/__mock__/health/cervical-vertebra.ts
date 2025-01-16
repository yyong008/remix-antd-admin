import { data, op_data } from "~/__mock__/db/health/cervical-vertebra";
import { delay, of } from "rxjs";

export const getCervicalData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
