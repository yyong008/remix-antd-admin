import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as toolsMailServices from "~/dals/tools/mail";
import * as utils from "~/utils/server";

import { from, switchMap } from "rxjs";

class Action {
  @ds.Action
  async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.authorize()
  async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => toolsMailServices.createEmailTemplate$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.authorize()
  async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => toolsMailServices.updateEmailTemplate$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.authorize()
  async delete({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        toolsMailServices.deleteEmailTemplateByIds$(ids),
      ),
    );

    return utils.resp$(result$);
  }
}

export const action = new Action().action;
