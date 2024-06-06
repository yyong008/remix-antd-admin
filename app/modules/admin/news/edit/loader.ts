import * as ds from "~/server/decorators";
import * as newsCategoryServices from "~/server/services/news/news-category";
import * as newsServices from "~/server/services/news/news";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

class AdminNewsEditLoader {
  @ds.checkLogin()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    return utils.resp({
      TINYMCE_KEY: process.env.TINYMCE_KEY,
      newsCategory: await newsCategoryServices.getFindNewsCategory(),
      news: params.id ? await newsServices.getNewsById(Number(params.id)) : {},
    });
  }
}

export const loader = new AdminNewsEditLoader().loader;
