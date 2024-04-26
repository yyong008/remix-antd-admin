// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// remix
import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as uparseMultipartFormData,
} from "@remix-run/node";

// services
import * as sessionServices from "~/server/services/common/session";
import * as storageServices from "~/server/services/tools/storage";

// utils
import * as clientUtils from "~/utils";
import { resp$ } from "~/server/utils";

// rxjs
import { forkJoin, from, lastValueFrom, of, switchMap } from "rxjs";

export class ApiUploadController {
  @ds.Action
  static async action({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.checkLogin()
  static async post({ request, params }: rrn.LoaderFunctionArgs) {
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
