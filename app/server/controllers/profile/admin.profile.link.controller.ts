// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// services
import * as profileLinkServices from "~/server/services/profile/link";

// response
import * as utils from "~/server/utils";

// rxjs
import { from, switchMap } from "rxjs";

export class AdminProfileLinkController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ params }: rrn.LoaderFunctionArgs) {
    const { id } = params;
    const result$ = from(profileLinkServices.getLinkListById(Number(id)));
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(profileLinkServices.createLink(data))),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(profileLinkServices.updateLink$(data))),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async delete({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        from(profileLinkServices.deleteLinkByIds$(ids)),
      ),
    );
    return utils.resp$(result$);
  }
}
