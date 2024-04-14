// decorators
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AdminAboutController {
  @checkLogin()
  static async loader() {
    return null;
  }
}
