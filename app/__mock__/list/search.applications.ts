import { of, delay } from "rxjs";
import { cardList } from "~/__mock__/db/list/search.applications";

export const getSearchApplicationCardList$ = () => {
  return of({ cardList }).pipe(delay(20));
};
