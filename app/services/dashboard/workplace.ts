import { delay, of } from "rxjs";
import { workplaceData } from "~/db/dashboard/workplace";

export const getWorkplaceData$ = () => {
  return of(workplaceData).pipe(delay(20));
};
