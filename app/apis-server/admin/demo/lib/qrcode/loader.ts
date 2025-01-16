import type { LoaderFunction } from "react-router";
import { getQrCodeList$ } from "~/__mock__/lib/qrcode";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getQrCodeList$());
  return { list: data };
};
