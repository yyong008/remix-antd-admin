import * as ds from "~/decorators";
import * as newsCategoryServices from "~/services/news/news-category";
import * as newsServices from "~/services/news/news";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

class AdminNewsEditLoader {
  @ds.authorize()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    return utils.resp({
      TINYMCE_KEY: process.env.TINYMCE_KEY,
      newsCategory: await newsCategoryServices.getFindNewsCategory(),
      news: params.id ? await newsServices.getNewsById(Number(params.id)) : {},
    });
  }
}

export const loader = new AdminNewsEditLoader().loader;
