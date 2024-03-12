// types
import type { TreeProps } from "antd/es/tree";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Col, Row, Tree } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// libs
import { lastValueFrom } from "rxjs";

// service
import { getMenuData$ } from "~/services/menu";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Menu" },
    { name: "System-Menu", content: "System-Menu" },
  ];
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { treeData, treeDataAdmin, treeDataUser } =
    await lastValueFrom(getMenuData$());
  return json({ treeData, treeDataAdmin, treeDataUser });
};

export default function MenuRoute() {
  const { treeData, treeDataAdmin, treeDataUser } =
    useLoaderData<typeof loader>();

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  return (
    <PageContainer>
      <ProCard>
        <Row className="h-[70vh]">
          <Col span={8}>
            <Tree
              checkable
              defaultExpandedKeys={["0-0"]}
              defaultSelectedKeys={["0-0"]}
              defaultCheckedKeys={["0-0"]}
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeData as any}
            />
          </Col>
          <Col span={8}>
            <Tree
              checkable
              defaultExpandedKeys={["0-0"]}
              defaultSelectedKeys={["0-0"]}
              defaultCheckedKeys={["0-0"]}
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeDataAdmin as any}
            />
          </Col>
          <Col span={8}>
            <Tree
              checkable
              defaultExpandedKeys={["0-0"]}
              defaultSelectedKeys={["0-0"]}
              defaultCheckedKeys={["0-0"]}
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeDataUser as any}
            />
          </Col>
        </Row>
      </ProCard>
    </PageContainer>
  );
}
