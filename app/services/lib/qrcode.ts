import { delay, of } from "rxjs";

import { data } from "~/db/lib/qrcode";

export const getQrCodeList$ = () => {
  return of(data).pipe(delay(20));
};
