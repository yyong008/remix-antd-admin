import type { LoaderFunction } from "react-router";
import { getPackageJsonData$ } from "~/__mock__/editor/json.service";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const { packageJson } = await lastValueFrom(getPackageJsonData$());
  return {
    packageJson,
  };
};
