import { of, delay } from "rxjs";
import { data, op_data } from "~/db/health/anxiety-depression";

export const getDiseaseData$ = () => {
  return of({ data, op_data }).pipe(delay(20));
};
