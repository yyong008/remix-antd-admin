/* eslint-disable jsx-a11y/anchor-is-valid */
import type { LoaderFunction, LoaderFunctionArgs } from "react-router";

import { getTableListDataSource$ } from "~/__mock__/profile/profile.server";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { tableListDataSource } = await lastValueFrom(
    getTableListDataSource$(),
  );
  return tableListDataSource;
};
