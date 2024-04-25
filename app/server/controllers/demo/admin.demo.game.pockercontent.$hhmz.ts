// types
// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
// styles
import "animate.css";
import "~/styles/game/pocker-card.css";

// libs
import { lastValueFrom } from "rxjs";

// services
import { getPockeraData$ } from "~/__mock__/game/pocker";
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoGamePockerContentWithHHMZController {
  @checkLogin()
  static async loader() {
    const { hs } = await lastValueFrom(getPockeraData$());
    return json(hs);
  }
}
