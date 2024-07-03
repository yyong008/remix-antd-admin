import * as ds from "~/decorators";
import * as newsCategoryServices from "~/dals/news/news-category";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

export class AdminNewsCategoryLoader {
  @ds.authorize()
  async loader({ params }: rrn.LoaderFunctionArgs) {
    return utils.resp$(newsCategoryServices.getAllNewsCategory$());
  }
}

export const loader = new AdminNewsCategoryLoader().loader;
