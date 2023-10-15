// types
import type { DataNode, TreeProps } from "antd/es/tree";
import type { LoaderFunctionArgs } from "@remix-run/node";

// core
import { json } from "@remix-run/node";

// components:vendors
import { Col, Row, Tree } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

const treeData: DataNode[] = [
  {
    title: "超级管理员",
    key: "0-0",
    selectable: false,
    children: [
      {
        title: "工作台",
        key: "0-0-0",
        disabled: false,
        children: [
          {
            title: "分析页",
            key: "0-0-0-0",
            // disableCheckbox: true,
          },
          {
            title: "监控页",
            key: "0-0-0-1",
          },
          {
            title: "工作空间",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "表单",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>基础表单</span>,
            key: "0-0-1-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>步骤表单</span>,
            key: "0-0-1-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>基础增强</span>,
            key: "0-0-1-2",
          },
        ],
      },
      {
        title: "搜索列表",
        key: "0-0-2",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>搜索列表</span>,
            key: "0-0-2-0",
            children: [
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（文章）</span>
                ),
                key: "0-0-2-1-0",
              },
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（项目）</span>
                ),
                key: "0-0-2-2-0",
              },
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（应用）</span>
                ),
                key: "0-0-2-3-0",
              },
            ],
          },
          {
            title: <span style={{ color: "#1890ff" }}>表格搜索</span>,
            key: "0-0-2-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>基础列表</span>,
            key: "0-0-2-2",
          },
          {
            title: <span style={{ color: "#1890ff" }}>卡片列表</span>,
            key: "0-0-2-3",
          },
        ],
      },
      {
        title: "详情",
        key: "0-0-3",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>基础详情页</span>,
            key: "0-0-3-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>高阶详情页</span>,
            key: "0-0-3-1",
          },
        ],
      },
      {
        title: "结果",
        key: "0-0-4",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>结果-成功</span>,
            key: "0-0-4-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>结果-失败</span>,
            key: "0-0-4-1",
          },
        ],
      },
      {
        title: "异常",
        key: "0-0-5",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>异常-403</span>,
            key: "0-0-5-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>异常-404</span>,
            key: "0-0-5-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>异常-500</span>,
            key: "0-0-5-2",
          },
        ],
      },
      {
        title: "个人页",
        key: "0-0-6",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>个人中心</span>,
            key: "0-0-6-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>个人设置</span>,
            key: "0-0-6-1",
          },
        ],
      },
      {
        title: "编辑器",
        key: "0-0-7",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>流编辑器</span>,
            key: "0-0-7-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>脑图编辑器</span>,
            key: "0-0-7-1",
          },
        ],
      },
    ],
  },
];

const treeDataAdmin: DataNode[] = [
  {
    title: "管理员",
    key: "0-0",
    selectable: false,
    children: [
      {
        title: "工作台",
        key: "0-0-0",
        disabled: false,
        children: [
          {
            title: "分析页",
            key: "0-0-0-0",
            // disableCheckbox: true,
          },
          {
            title: "监控页",
            key: "0-0-0-1",
          },
          {
            title: "工作空间",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "表单",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>基础表单</span>,
            key: "0-0-1-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>步骤表单</span>,
            key: "0-0-1-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>基础增强</span>,
            key: "0-0-1-2",
          },
        ],
      },
      {
        title: "搜索列表",
        key: "0-0-2",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>搜索列表</span>,
            key: "0-0-2-0",
            children: [
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（文章）</span>
                ),
                key: "0-0-2-1-0",
              },
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（项目）</span>
                ),
                key: "0-0-2-2-0",
              },
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（应用）</span>
                ),
                key: "0-0-2-3-0",
              },
            ],
          },
          {
            title: <span style={{ color: "#1890ff" }}>表格搜索</span>,
            key: "0-0-2-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>基础列表</span>,
            key: "0-0-2-2",
          },
          {
            title: <span style={{ color: "#1890ff" }}>卡片列表</span>,
            key: "0-0-2-3",
          },
        ],
      },
      {
        title: "详情",
        key: "0-0-3",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>基础详情页</span>,
            key: "0-0-3-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>高阶详情页</span>,
            key: "0-0-3-1",
          },
        ],
      },
      {
        title: "结果",
        key: "0-0-4",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>结果-成功</span>,
            key: "0-0-4-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>结果-失败</span>,
            key: "0-0-4-1",
          },
        ],
      },
      {
        title: "异常",
        key: "0-0-5",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>异常-403</span>,
            key: "0-0-5-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>异常-404</span>,
            key: "0-0-5-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>异常-500</span>,
            key: "0-0-5-2",
          },
        ],
      },
      {
        title: "个人页",
        key: "0-0-6",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>个人中心</span>,
            key: "0-0-6-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>个人设置</span>,
            key: "0-0-6-1",
          },
        ],
      },
      {
        title: "编辑器",
        key: "0-0-7",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>流编辑器</span>,
            key: "0-0-7-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>脑图编辑器</span>,
            key: "0-0-7-1",
          },
        ],
      },
    ],
  },
];

const treeDataUser: DataNode[] = [
  {
    title: "用户",
    key: "0-0",
    selectable: false,
    children: [
      {
        title: "工作台",
        key: "0-0-0",
        disabled: false,
        children: [
          {
            title: "分析页",
            key: "0-0-0-0",
            // disableCheckbox: true,
          },
          {
            title: "监控页",
            key: "0-0-0-1",
          },
          {
            title: "工作空间",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "表单",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>基础表单</span>,
            key: "0-0-1-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>步骤表单</span>,
            key: "0-0-1-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>基础增强</span>,
            key: "0-0-1-2",
          },
        ],
      },
      {
        title: "搜索列表",
        key: "0-0-2",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>搜索列表</span>,
            key: "0-0-2-0",
            children: [
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（文章）</span>
                ),
                key: "0-0-2-1-0",
              },
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（项目）</span>
                ),
                key: "0-0-2-2-0",
              },
              {
                title: (
                  <span style={{ color: "#1890ff" }}>搜索列表（应用）</span>
                ),
                key: "0-0-2-3-0",
              },
            ],
          },
          {
            title: <span style={{ color: "#1890ff" }}>表格搜索</span>,
            key: "0-0-2-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>基础列表</span>,
            key: "0-0-2-2",
          },
          {
            title: <span style={{ color: "#1890ff" }}>卡片列表</span>,
            key: "0-0-2-3",
          },
        ],
      },
      {
        title: "详情",
        key: "0-0-3",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>基础详情页</span>,
            key: "0-0-3-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>高阶详情页</span>,
            key: "0-0-3-1",
          },
        ],
      },
      {
        title: "结果",
        key: "0-0-4",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>结果-成功</span>,
            key: "0-0-4-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>结果-失败</span>,
            key: "0-0-4-1",
          },
        ],
      },
      {
        title: "异常",
        key: "0-0-5",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>异常-403</span>,
            key: "0-0-5-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>异常-404</span>,
            key: "0-0-5-1",
          },
          {
            title: <span style={{ color: "#1890ff" }}>异常-500</span>,
            key: "0-0-5-2",
          },
        ],
      },
      {
        title: "个人页",
        key: "0-0-6",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>个人中心</span>,
            key: "0-0-6-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>个人设置</span>,
            key: "0-0-6-1",
          },
        ],
      },
      {
        title: "编辑器",
        key: "0-0-7",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>流编辑器</span>,
            key: "0-0-7-0",
          },
          {
            title: <span style={{ color: "#1890ff" }}>脑图编辑器</span>,
            key: "0-0-7-1",
          },
        ],
      },
    ],
  },
];

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  return json({});
};

export default function AuthRoute() {
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  return (
    <PageContainer>
      <ProCard>
        <Row>
          <Col span={8}>
            <Tree
              checkable
              defaultExpandedKeys={["0-0"]}
              defaultSelectedKeys={["0-0"]}
              defaultCheckedKeys={["0-0"]}
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeData}
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
              treeData={treeDataAdmin}
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
              treeData={treeDataUser}
            />
          </Col>
        </Row>
      </ProCard>
    </PageContainer>
  );
}
