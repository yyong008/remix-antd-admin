import type * as tn from "@remix-run/node";

import { rps } from "~/utils/server";

export const loader = (args: tn.LoaderFunctionArgs) => {
  return rps.rfj({
    lang: args.params.lang,
  });
};
