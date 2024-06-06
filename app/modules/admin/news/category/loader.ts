import * as ds from "~/decorators";
import * as newsCategoryServices from "~/services/news/news-category";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

export class AdminNewsCategoryLoader {
  @ds.checkLogin()
  async loader({ params }: rrn.LoaderFunctionArgs) {
    return utils.resp$(newsCategoryServices.getAllNewsCategory$());
  }
}

export const loader = new AdminNewsCategoryLoader().loader;
