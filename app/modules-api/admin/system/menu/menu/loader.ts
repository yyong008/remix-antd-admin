import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as serviceUtils from "~/utils/server";
import * as systemMenuRoleServices from "~/dals/system/menu-role";
import * as systemMenuServices from "~/dals/system/menu";

import { forkJoin, from } from "rxjs";

import i18n from "~/libs/i18n/i18next.server";

const perms = {
  READ_LIST: "system:user:list",
  READ: "system:user:read",
  DELETE: "system:user:delete",
  UPDATE: "system:user:update",
  CREATE: "system:user:create",
};

class Loader {
  @ds.authorize()
  @ds.permission(perms.READ_LIST)
  async loader({ params }: rrn.LoaderFunctionArgs) {
    const { lang } = params;
    let t = await i18n.getFixedT(lang!);

    const result$ = forkJoin({
      menu: from(systemMenuServices.getMenu(t, lang!)),
      menuRaw: from(systemMenuRoleServices.getMenuRaw(t, lang!)),
      menuNotPerm: from(systemMenuRoleServices.getTypeNotPermMenu(t)),
    });

    return serviceUtils.resp$(result$);
  }
}

export const loader = new Loader().loader;
