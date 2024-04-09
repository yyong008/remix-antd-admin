// remix
import { json } from "@remix-run/node";

// rxjs
import { catchError, lastValueFrom, map, throwError } from "rxjs";

// server
import { getSystemInfo$ } from "~/server/services/common/systemInfo";

export const loader = async () => {
  const t = Date.now();
  const createResp = (code: number, data: any, message?: string) => () => {
    return json({
      code: code ?? 0,
      data,
      time: Date.now() - t,
      message: message ?? "success",
    });
  };
  const restFn = await lastValueFrom(
    getSystemInfo$().pipe(
      map((data) => createResp(0, data)),
      catchError(() => throwError(createResp(1, {}))),
    ),
  );
  return restFn?.();
};
