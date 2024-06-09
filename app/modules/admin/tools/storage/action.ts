import * as ac from "./actions";
import * as as from "~/constants/actions";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as schemas from "~/schema";
import * as us from "~/utils/server";

import { storagePermissions as p } from "~/constants/permission";

class A {
  @ds.authorize()
  static async action(actionArgs: rrn.ActionFunctionArgs) {
    const _data = await actionArgs.request.json();
    const type = _data.type;
    try {
      if (type === as.ACTION_STORAGE_DELETE_BY_IDS)
        return A.deleteBlogCategory(actionArgs);
      return us.rsj({});
    } catch (error) {
      return us.rfj();
    }
  }

  @ds.permission(p.DELETE)
  @ds.validate(schemas.DeleteStorageByIdSchema)
  static async deleteBlogCategory(args: rrn.ActionFunctionArgs) {
    const result = await ac.deleteStorageByIds(args);
    return us.rsj(result);
  }
}

export const action = A.action;
