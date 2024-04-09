// types
import type { MetaFunction } from "@remix-run/node";

// react
import { useCallback } from "react";

// components
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// components
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "~/components/editor/ReactFlow/InitialElement";
import CustomNode from "~/components/editor/ReactFlow/CustomNode";

// styles
import "reactflow/dist/style.css";
import "~/styles/editor/reactflow.css";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "editor-mind",
    },
  ];
};

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

export default function OverviewFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "custom")?.data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  return (
    <PageContainer>
      <ProCard className="h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edgesWithUpdatedTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={(reactFlowInstance: any) => console.log()}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
        >
          <MiniMap style={minimapStyle} zoomable pannable />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ProCard>
    </PageContainer>
  );
}
