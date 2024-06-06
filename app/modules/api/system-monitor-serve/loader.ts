import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";

import { HigherOrderCreateRespWithTime, respFn$ } from "~/server/utils";
import { catchError, map, throwError } from "rxjs";

import { getSystemInfo$ } from "~/server/services/common/systemInfo";

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
