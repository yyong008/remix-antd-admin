// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import ReactFlow from "reactflow";
import { ProCard, PageContainer } from "@ant-design/pro-components";

// styles
import "reactflow/dist/style.css";
import { lastValueFrom } from "rxjs";
import { getFlowData$ } from "~/services/editor/flow.service";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "editor-flow",
    },
  ];
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { initialNodes, initialEdges } = await lastValueFrom(getFlowData$());

  return json({
    nodes: initialNodes,
    edges: initialEdges,
  });
};

export default function EditorFlowRoute() {
  const { nodes, edges } = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <ProCard
        style={{
          height: 600,
          width: "100%",
        }}
      >
        <ReactFlow nodes={nodes} edges={edges} fitView />
      </ProCard>
    </PageContainer>
  );
}
