import * as serverUtils from "~/utils/server";

class Loader {
  async loader() {
    return serverUtils.respSuccessJson({});
  }
}

export const loader = new Loader().loader;
