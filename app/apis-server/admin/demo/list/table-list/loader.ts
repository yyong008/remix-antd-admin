import type { LoaderFunction } from "react-router";
import { getTableListDataSource$ } from "~/__mock__/profile/profile.server";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const { tableListDataSource } = await lastValueFrom(
    getTableListDataSource$(),
  );
  return tableListDataSource;
};
