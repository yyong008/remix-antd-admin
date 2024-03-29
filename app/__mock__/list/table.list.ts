import { of, delay } from "rxjs";
import { tableListDataSource } from "~/__mock__/db/list/table.list";

export const getCardList$ = () => {
  return of({ tableListDataSource }).pipe(delay(20));
};
