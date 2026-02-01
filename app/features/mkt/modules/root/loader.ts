import type * as tn from "react-router";

import { rps } from "~/utils/server";

export const loader = (args: tn.LoaderFunctionArgs) => {
	return rps.rfj({
		lang: args.params.lang,
	});
};
