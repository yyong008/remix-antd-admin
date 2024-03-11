import { of, delay } from "rxjs";
import { accountSettingData } from "~/db/account/settings";

export const getAccountSettingsData$ = () => {
  return of({ accountSettingData }).pipe(delay(20));
};
