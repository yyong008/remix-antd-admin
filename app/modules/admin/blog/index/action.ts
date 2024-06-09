import * as as from "~/constants/actions";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as schemas from "~/schema";
import * as us from "~/utils/server";

import {
  actionBlogCreate,
  actionBlogDelete,
  actionBlogUpdate,
} from "./actions";

import { blogPermissions } from "~/constants/permission";

class A {
  @ds.authorize()
  static async action(actionArgs: rrn.ActionFunctionArgs) {
    const _data = await actionArgs.request.json();
    const type = _data.type;
    try {
      if (type === as.ACTION_CREATE_BLOG) return A.createBlog(actionArgs);
      if (type === as.ACTION_UPDATE_BLOG) return A.updateBlog(actionArgs);
      if (type === as.ACTION_DELETE_BLOG) return A.deleteBlog(actionArgs);
      return us.rsj({});
    } catch (error) {
      return us.rfj();
    }
  }

  @ds.permission(blogPermissions.CREATE)
  @ds.validate(schemas.CreateBlogSchema)
  static async createBlog(args: rrn.ActionFunctionArgs) {
    const result = await actionBlogCreate(args);
    return us.rsj(result);
  }

  @ds.permission(blogPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogSchema)
  static async updateBlog(args: rrn.ActionFunctionArgs) {
    const result = await actionBlogUpdate(args);
    return us.rsj(result);
  }

  @ds.permission(blogPermissions.DELETE)
  @ds.validate(schemas.DeleteBlogSchema)
  static async deleteBlog(args: rrn.ActionFunctionArgs) {
    const result = await actionBlogDelete(args);
    return us.rsj(result);
  }
}

export const action = A.action;
