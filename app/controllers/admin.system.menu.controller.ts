// types
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  // MetaFunction,
} from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// service
import {
  createMenu,
  deleteMenu,
  getMenu,
  updateMenu,
} from "~/server/services/system/menu";
import {
  getMenuRaw,
  getTypeNotPermMenu,
} from "~/server/services/system/menu-role";
import i18n from "~/i18n/i18next.server";

// schemas
import {
  AddMenuDirSchema,
  AddMenuSchema,
  AddMenuPermSchema,
  deleteMenuSchema,
  UpdateMenuDirSchema,
  UpdateMenuPermSchema,
  UpdateMenuSchema,
} from "~/schema/menu.schema";

// decorator
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AdminSystemMenuController {
  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    const method = request.method;
    if (method === "POST") {
      const menuDto = await request.json();
      let validatedMenu: any = {};
      // 校验
      try {
        if (menuDto.type === 1) {
          validatedMenu = await AddMenuDirSchema.parse(menuDto);
        } else if (menuDto.type === 2) {
          validatedMenu = await AddMenuSchema.parse(menuDto);
        } else if (menuDto.type === 3) {
          validatedMenu = await AddMenuPermSchema.parse(menuDto);
        }
      } catch (error) {
        console.log("error", error);
        return json({ code: 1, data: {}, message: error });
      }

      // 创建
      const menu = await createMenu(validatedMenu);

      if (menu) {
        return json({ code: 0, data: {}, message: "success" });
      } else {
        return json({ code: 1, data: {}, message: "fail" });
      }
    } else if (method === "PUT") {
      const menuDto = await request.json();
      let validatedMenu = null;

      try {
        if (menuDto.type === 1) {
          validatedMenu = await UpdateMenuDirSchema.parse(menuDto);
        } else if (menuDto.type === 2) {
          validatedMenu = await UpdateMenuSchema.parse(menuDto);
        } else if (menuDto.type === 3) {
          validatedMenu = await UpdateMenuPermSchema.parse(menuDto);
        }
      } catch (error) {
        console.log("error", error);
        return json({ code: 1, data: {}, message: error?.toString() });
      }

      const menu = await updateMenu(validatedMenu);
      if (menu) {
        return json({ code: 0, data: {}, message: "success" });
      } else {
        return json({ code: 1, data: {}, message: "fail" });
      }
    } else if (method === "DELETE") {
      const { ids } = await request.json();

      let validateIds: { ids: number[] } = { ids };
      try {
        validateIds = await deleteMenuSchema.parse({ ids });
      } catch (error) {
        console.log("error", error);
        return json({ code: 1, data: {}, message: error });
      }

      const menu = await deleteMenu(validateIds.ids);

      if (menu) {
        return json({ code: 0, data: {}, message: "success" });
      } else {
        return json({ code: 1, data: {}, message: "fail" });
      }
    }
  }

  @checkLogin()
  static async loader({ params }: LoaderFunctionArgs) {
    const { lang } = params;
    let t = await i18n.getFixedT(lang!);
    return json({
      menu: await getMenu(t, lang!),
      menuRaw: await getMenuRaw(t, lang!),
      menuNotPerm: await getTypeNotPermMenu(t),
    });
  }
}
