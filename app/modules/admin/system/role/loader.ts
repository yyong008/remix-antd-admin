import * as SystemMenuRoleServices from "~/server/services/system/menu-role";
import * as ds from "~/server/decorators";
// import * as roleSchemas from "~/schema/role.schema";
import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/server/utils";
import * as systemRoleServices from "~/server/services/system/role";

import { forkJoin, from, lastValueFrom } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader({ request }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      dataSource: from(systemRoleServices.getRoleList()),
      flatMenu: from(SystemMenuRoleServices.getFlatMenu()),
      menuRoles: from(systemRoleServices.getMenuRoles()),
    });

    const data = await lastValueFrom(result$);
    return data
      ? serverUtils.respSuccessJson(data)
      : serverUtils.respFailJson({});
  }
}

export const loader = new Loader().loader;
