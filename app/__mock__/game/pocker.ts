import { delay, of } from "rxjs";
import { hs, pockerEmojis } from "~/__mock__/db/game/pocker";

export const getPockeraData$ = () => {
  return of({ pockerEmojis, hs }).pipe(delay(20));
};
