import { of, delay } from "rxjs";
import { accountData } from "~/__mock__/db/account/center";

export const getAccountData$ = () => {
  return of(accountData).pipe(delay(20));
};
