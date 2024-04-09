// remix
import { json } from "@remix-run/node";

// rxjs
import { catchError, map, throwError } from "rxjs";

// server
import { getSystemInfo$ } from "~/server/services/common/systemInfo";

export const loader = async () => {
  const t = Date.now();
  const createResp = (data: any, message?: string) => () =>
    json({
      code: 0,
      data,
      time: Date.now() - t,
      message: message ?? "success",
    });
  getSystemInfo$()
    .pipe(
      map((data) => createResp(data)),
      catchError(() => throwError(createResp({}))),
    )
    .subscribe({
      next(v) {
        return v?.();
      },
      error(err) {
        return err?.();
      },
    });
};
