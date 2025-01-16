import "reactflow/dist/style.css";

import { PageContainer, ProCard } from "@ant-design/pro-components";

import ReactFlow from "reactflow";
import type { loader } from "./loader";
import { useLoaderData } from "react-router";

export function Route() {
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
