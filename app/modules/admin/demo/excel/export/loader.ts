import { getExcelDisease$ } from "~/__mock__/db/excel/export";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader = async () => {
  const { dataSource } = await lastValueFrom(getExcelDisease$());
  return json({ dataSource });
};
