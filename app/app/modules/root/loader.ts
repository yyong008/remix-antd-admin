import type * as tn from "react-router";
import { rps } from "~/utils/server";

export const loader = (args: tn.LoaderFunctionArgs) => {
  const { lang } = args.params;
  return rps.rsj({
    lang,
  });
};
