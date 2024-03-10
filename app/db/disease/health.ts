import { delay, of } from "rxjs";

export const getHealthData$ = async () => {
  const { data } = await import("../../data/disease/health");
  return of({ data }).pipe(delay(20));
};
