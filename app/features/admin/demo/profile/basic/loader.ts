/* eslint-disable jsx-a11y/anchor-is-valid */
import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import { getTableListDataSource$ } from "~/__mock__/profile/profile.server";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { tableListDataSource } = await lastValueFrom(
    getTableListDataSource$(),
  );
  return json(tableListDataSource);
};
