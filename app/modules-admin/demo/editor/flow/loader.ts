import type { LoaderFunctionArgs } from "react-router";
import { getFlowData$ } from "~/__mock__/editor/flow.service";
import { lastValueFrom } from "rxjs";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { initialNodes, initialEdges } = await lastValueFrom(getFlowData$());

  return {
    nodes: initialNodes,
    edges: initialEdges,
  };
};
