import { getExcelDisease$ } from "~/__mock__/db/excel/export";
import { lastValueFrom } from "rxjs";

export const loader = async () => {
  const { dataSource } = await lastValueFrom(getExcelDisease$());
  return { dataSource };
};
