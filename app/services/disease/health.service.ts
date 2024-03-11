import { delay, of } from "rxjs";
import { data } from "../../db/disease/health";

export const getHealthData$ = () => {
  return of({ data }).pipe(delay(20));
};
