// types
// import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// rxjs
import { lastValueFrom } from "rxjs";

// db
import { getFlowData$ } from "~/__mock__/editor/flow.service";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoEditorFlow {
  @checkLogin()
  static async loader() {
    const { initialNodes, initialEdges } = await lastValueFrom(getFlowData$());

    return json({
      nodes: initialNodes,
      edges: initialEdges,
    });
  }
}
