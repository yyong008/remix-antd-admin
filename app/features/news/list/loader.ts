import * as ds from "~/server/decorators";
import * as newsServices from "~/server/services/news/news";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

class AdminNewsLoader {
  @ds.checkLogin()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = newsServices.getNewsListByCategoryId$(Number(params.id));
    return utils.resp$(result$);
  }
}

export const loader = new AdminNewsLoader().loader;
