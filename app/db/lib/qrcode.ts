import { delay, of } from "rxjs";

const data = [
  { name: "qrcode", url: "https://www.npmjs.com/package/qrcode" },
  {
    name: "remix-antd-admin",
    url: "https://github.com/yyong008/remix-antd-admin",
  },
];

export const getQrCodeList$ = () => {
  return of(data).pipe(delay(20));
};
