import { json } from "@remix-run/node";
import { getNews } from "~/services/news/news";

class Loader {
  async loader() {
    return json({
      code: 0,
      message: "success",
      news: await getNews(),
    });
  }
}

export const loader = new Loader().loader;
