import { of, delay } from "rxjs";
import { pockerEmojis, hs } from "~/__mock__/db/game/pocker";

export const getPockeraData$ = () => {
  return of({ pockerEmojis, hs }).pipe(delay(20));
};
