import { of, delay } from "rxjs";
import { dataSource } from "~/db/list/basic.list";

export const getBasicList$ = () => {
  return of({ dataSource }).pipe(delay(20));
};
