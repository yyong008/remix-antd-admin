import { of, delay } from "rxjs";
import { data, op_data } from "~/__mock__/db/health/anxiety-depression";

export const getDiseaseData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
