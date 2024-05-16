import * as ds from "~/server/decorators";
import * as newsCategoryServices from "~/server/services/news/news-category";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

export class AdminNewsCategoryLoader {
  @ds.checkLogin()
  async loader({ params }: rrn.LoaderFunctionArgs) {
    return utils.resp$(newsCategoryServices.getAllNewsCategory$());
  }
}

export const loader = new AdminNewsCategoryLoader().loader;
