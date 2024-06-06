import type { LoaderFunctionArgs } from "@remix-run/node";
import { getFlowData$ } from "~/__mock__/editor/flow.service";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { initialNodes, initialEdges } = await lastValueFrom(getFlowData$());

  return json({
    nodes: initialNodes,
    edges: initialEdges,
  });
};
