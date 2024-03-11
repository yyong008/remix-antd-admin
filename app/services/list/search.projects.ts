import { of, delay } from "rxjs";
import { cardList } from "~/db/list/search.projects";

export const getSearchProjectCardList$ = () => {
  return of({ cardList }).pipe(delay(20));
};
