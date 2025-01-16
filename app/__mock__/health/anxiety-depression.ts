import { data, op_data } from "~/__mock__/db/health/anxiety-depression";
import { delay, of } from "rxjs";

export const getDiseaseData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
