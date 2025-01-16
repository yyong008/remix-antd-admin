import { delay, of } from "rxjs";

import { accountSettingData } from "~/__mock__/db/account/settings";

export const getAccountSettingsData$ = () => {
  return of({ accountSettingData }).pipe(delay(20));
};
