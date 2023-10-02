// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// core
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components:vendor
import ReactFlow from "reactflow";
import { ProCard } from "@ant-design/pro-components";

// styles
import reactflowStyleUrl from "reactflow/dist/style.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: reactflowStyleUrl,
    },
  ];
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "流程编辑器",
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const {initialNodes, initialEdges}  = (await import('~/data/editor.flow'))
  return json({
    nodes: initialNodes,
    edges: initialEdges,
  });
};

function EditorFlowRoute() {
  const { nodes, edges } = useLoaderData()

  return (
    <ProCard
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </ProCard>
  );
}

export default EditorFlowRoute;
