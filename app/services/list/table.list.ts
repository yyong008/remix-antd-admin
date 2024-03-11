import { of, delay } from "rxjs";
import { tableListDataSource } from "~/db/list/table.list";

export const getCardList$ = () => {
  return of({ tableListDataSource }).pipe(delay(20));
};
