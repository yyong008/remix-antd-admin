import type { LoaderFunction } from "@remix-run/node";
import { getQrCodeList$ } from "~/__mock__/lib/qrcode";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getQrCodeList$());
  return json({ list: data });
};
