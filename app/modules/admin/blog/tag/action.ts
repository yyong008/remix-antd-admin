import * as ac from "./actions";
import * as as from "~/constants/actions";
import * as ds from "~/decorators";
import * as sc from "~/schema";
import type * as tn from "@remix-run/node";
import * as us from "~/utils/server";

import { blogTagPermissions as p } from "~/constants/permission";

class A {
  @ds.authorize()
  static async action(actionArgs: tn.ActionFunctionArgs) {
    const _data = await actionArgs.request.json();
    const type = _data.type;
    try {
      if (type === as.ACTION_CREATE_BLOG_TAG)
        return A.createBlogTag(actionArgs);
      if (type === as.ACTION_UPDATE_BLOG_TAG)
        return A.updateBlogTag(actionArgs);
      if (type === as.ACTION_DELETE_BLOG_TAG) return A.deletBlogTag(actionArgs);
      return us.rsj({});
    } catch (error) {
      return us.rfj();
    }
  }

  @ds.permission(p.CREATE)
  @ds.validate(sc.CreateBlogTagSchema)
  static async createBlogTag(args: tn.ActionFunctionArgs) {
    const result = await ac.actionBlogTagCreate(args);

    return us.rsj(result);
  }

  @ds.permission(p.UPDATE)
  @ds.validate(sc.UpdateBlogTagSchema)
  static async updateBlogTag(args: tn.ActionFunctionArgs) {
    const result = await ac.actionBlogTagUpdate(args);
    return us.rsj(result);
  }

  @ds.permission(p.DELETE)
  @ds.validate(sc.DeleteBlogTagSchema)
  static async deletBlogTag(args: tn.ActionFunctionArgs) {
    const result = await ac.actionBlogTagUpdate(args);

    return us.rsj(result);
  }
}

export const action = A.action;
