import * as clientUtils from "~/utils/client";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/lib/session";
import * as storageServices from "~/services/tools/storage";

import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as uparseMultipartFormData,
} from "@remix-run/node";
import { forkJoin, from, lastValueFrom, of, switchMap } from "rxjs";

import { resp$ } from "~/utils/server";

interface UploadInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
}

export class Action implements UploadInterface {
  @ds.Action
  action(actionArgs: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  async POST({ request, params }: rrn.LoaderFunctionArgs) {
    const userId = await lastValueFrom(sessionServices.getUserId$(request));

    if (!userId) {
      return resp$(of(null));
    }

    const result$ = forkJoin({
      fileUploader: of(
        createFileUploadHandler({
          maxPartSize: 2 * 1024 * 1024,
          directory: "public/uploads",
          file: ({ filename }) => filename,
        }),
      ),
      memoryUploader: of(createMemoryUploadHandler()),
    })
      .pipe(
        switchMap((data) =>
          of(composeUploadHandlers(data.fileUploader, data.memoryUploader)),
        ),
        switchMap((uploadHandler) =>
          from(uparseMultipartFormData(request, uploadHandler)),
        ),
        switchMap((formData) => of(formData.get("file"))),
      )
      .pipe(
        switchMap((file: any) =>
          storageServices.createStorage$({
            userId,
            name: file.name,
            fileName: file.name,
            extName: clientUtils.extname(file.name),
            path: "/uploads/" + file.name,
            size: file.size.toString(),
            type: file.type,
          }),
        ),
      );

    return resp$(result$);
  }
}

export const action = new Action().action;
