// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// rxjs
import { catchError, map, throwError } from "rxjs";

// server
import { getSystemInfo$ } from "~/server/services/common/systemInfo";

// utils
import { HigherOrderCreateRespWithTime, respFn$ } from "~/server/utils";

export class ApiSystemMonitorServeController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
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
