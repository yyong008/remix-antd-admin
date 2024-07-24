import * as SystemMenuRoleServices from "~/dals/system/menu-role";
import * as ds from "~/decorators";
// import * as roleSchemas from "~/schema/role.schema";
import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/utils/server";
import * as systemRoleServices from "~/dals/system/role";

import { forkJoin, from, lastValueFrom } from "rxjs";

class Loader {
  @ds.authorize()
  async loader({ request }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      dataSource: from(systemRoleServices.getRoleList()),
      flatMenu: from(SystemMenuRoleServices.getFlatMenu()),
      menuRoles: from(systemRoleServices.getMenuRoles()),
    });

    const data = await lastValueFrom(result$);
    return data ? serverUtils.rsj(data) : serverUtils.rfj({});
  }
}

export const loader = new Loader().loader;
