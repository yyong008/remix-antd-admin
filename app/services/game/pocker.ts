import { of, delay } from "rxjs";
import { pockerEmojis, hs } from "~/db/game/pocker";

export const getPockeraData$ = () => {
  return of({ pockerEmojis, hs }).pipe(delay(20));
};
