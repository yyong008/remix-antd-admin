import { of, delay } from "rxjs";
import { packageJson } from "~/__mock__/db/editor/json";

export const getPackageJsonData$ = () => {
  return of({ packageJson }).pipe(delay(20));
};
