import * as serverUtils from "~/server/utils";

class Loader {
  async loader() {
    return serverUtils.respSuccessJson({});
  }
}

export const loader = new Loader().loader;
