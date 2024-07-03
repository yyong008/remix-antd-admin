import type { LoaderFunction } from "@remix-run/node";
import { getPackageJsonData$ } from "~/__mock__/editor/json.service";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const { packageJson } = await lastValueFrom(getPackageJsonData$());
  return json({
    packageJson,
  });
};
