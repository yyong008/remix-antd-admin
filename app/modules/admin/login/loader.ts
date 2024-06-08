import * as serverUtils from "~/utils/server";

class Loader {
  async loader() {
    return serverUtils.rsj({});
  }
}

export const loader = new Loader().loader;
