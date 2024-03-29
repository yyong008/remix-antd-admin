import { of, delay } from "rxjs";
import { dataSource } from "~/__mock__/db/list/basic.list";

export const getBasicList$ = () => {
  return of({ dataSource }).pipe(delay(20));
};
