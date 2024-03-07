// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// core
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components:vendor
import ReactFlow from "reactflow";
import { ProCard, PageContainer } from "@ant-design/pro-components";

// styles
import "reactflow/dist/style.css";

export const meta: MetaFunction = () => {
  return [
    {
      title: "流程编辑器",
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { initialNodes, initialEdges } = await import("~/data/editor.flow");
  return json({
    nodes: initialNodes,
    edges: initialEdges,
  });
};

function EditorFlowRoute() {
  const { nodes, edges } = useLoaderData<typeof loader>();

  return (
    <PageContainer title="editor flow">
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

export default EditorFlowRoute;
