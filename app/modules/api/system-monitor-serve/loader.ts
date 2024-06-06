import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";

import { HigherOrderCreateRespWithTime, respFn$ } from "~/utils/server";
import { catchError, map, throwError } from "rxjs";

import { getSystemInfo$ } from "~/lib/systemInfo";

class Loader {
  @ds.checkLogin()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    const startTimeStamp = Date.now();
    const resultFn$ = getSystemInfo$().pipe(
      map((data) => HigherOrderCreateRespWithTime(data, startTimeStamp)),
      catchError(() =>
        throwError(HigherOrderCreateRespWithTime({}, startTimeStamp)),
      ),
    );

    return respFn$(resultFn$);
  }
}

export const loader = new Loader().loader;
