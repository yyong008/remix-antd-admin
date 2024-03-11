import { of, delay } from "rxjs";
import { accountData } from "~/db/account/center";

export const getAccountData$ = () => {
  return of(accountData).pipe(delay(20));
};
