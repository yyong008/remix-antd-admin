import { of, delay } from "rxjs";
import { cardList } from "~/db/list/search.applications";

export const getSearchApplicationCardList$ = () => {
  return of({ cardList }).pipe(delay(20));
};
