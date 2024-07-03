import type { LoaderFunction } from "@remix-run/node";
import { getPockeraData$ } from "~/__mock__/game/pocker";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const { hs } = await lastValueFrom(getPockeraData$());
  return json(hs);
};
