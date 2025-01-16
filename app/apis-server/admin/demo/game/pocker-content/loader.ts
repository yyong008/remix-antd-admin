import type { LoaderFunction } from "react-router";
import { getPockeraData$ } from "~/__mock__/game/pocker";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const { hs } = await lastValueFrom(getPockeraData$());
  return hs;
};
