import type * as rrn from "@remix-run/node";
import * as toolsMailServices from "~/dals/tools/mail";

import { lastValueFrom, of, switchMap } from "rxjs";

export async function query({ params }: rrn.LoaderFunctionArgs) {
  if (!params || !params.id) {
    return null;
  }
  const result$ = of(params.id).pipe(
    switchMap((id) => toolsMailServices.getEmailTemplateById$(Number(id))),
  );
  return await lastValueFrom(result$);
}
