import type { LoaderFunction } from "@remix-run/node";
import { getTableListDataSource$ } from "~/__mock__/profile/profile.server";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const { tableListDataSource } = await lastValueFrom(
    getTableListDataSource$(),
  );
  return json(tableListDataSource);
};
