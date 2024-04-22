// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import {
  createUser,
  deleteUserByIds,
  getUserList,
  updateUserById,
  getUserCount,
} from "~/server/services/system/user";
import { getRoleList } from "~/server/services/system/role";
import { getDeptListTree } from "~/server/services/system/dept";

// utils
import * as clientUtils from "~/utils";
import { respSuccessJson } from "~/server/utils";

// schema
import {
  userSchema,
  deleteUserSchema,
  userUpdateSchema,
} from "~/schema/user.schema";
import { checkLogin } from "../decorators/check-auth.decorator";

export default class AdminSystemUserController {
  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const method = request.method;
    if (method === "POST") {
      const userData = await request.json();
      try {
        const validatedUser = userSchema.parse(userData);

        const user = await createUser(validatedUser);

        if (user) {
          return json({ code: 0, data: {}, message: "success" });
        } else {
          return json({ code: 1, data: {}, message: "fail" });
        }
      } catch (error: any) {
        // 如果验证失败，捕获并处理错误
        console.error("Validation error:", error.errors);
        return json({ code: 1, data: {}, message: error?.errors });
      }
    } else if (method === "DELETE") {
      const userData = await request.json();

      try {
        const validateUserData = deleteUserSchema.parse(userData);
        const data: any = await deleteUserByIds(validateUserData.ids);
        if (data) {
          return json({ code: 0, data: {}, message: "success" });
        } else {
          return json({ code: 1, data: {}, message: data });
        }
      } catch (error: any) {
        console.error("Validation error:", error.errors);
        return json({ code: 1, data: {}, message: error?.errors });
      }
    } else if (method === "PUT") {
      const userData = await request.json();
      try {
        const validateUserData = userUpdateSchema.parse(userData);
        const data = await updateUserById(userData.id, validateUserData);
        if (data) {
          return json({ code: 0, data: {}, message: "success" });
        } else {
          return json({ code: 1, data: {}, message: data });
        }
      } catch (error: any) {
        console.error("Validation error:", error?.errors);
        return json({ code: 1, data: {}, message: error?.errors });
      }
    }
  }

  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const { page, pageSize, name } =
      await clientUtils.getPaginationByRequest(request);
    return respSuccessJson({
      total: await getUserCount(),
      dataSource: await getUserList({ page, pageSize, name }),
      roles: await getRoleList(),
      depts: await getDeptListTree(),
    });
  }
}
