import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Empty, Flex, Space, Spin, Tree, Typography } from "antd";
import type { DataNode } from "antd/es/tree";
import { useEffect, useMemo, useState } from "react";

import { CreateDeptModal } from "./CreateModal";
import { DeleteAction } from "./DeleteAction";
import { UpdateDeptModal } from "./UpdateModal";

type DeptItem = {
  id: string;
  name: string;
  description?: string;
  orderNo?: number;
  parentDepartmentId: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  children?: DeptItem[];
};

function buildTree(list: DeptItem[], parentId: string | null = null): DeptItem[] {
  return list
    .filter((item) => item.parentDepartmentId === parentId)
    .sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0))
    .map((item) => ({
      ...item,
      children: buildTree(list, item.id),
    }));
}

function mapToTreeData(items: DeptItem[]): DataNode[] {
  if (!items?.length) return [];
  return items.map((item) => ({
    key: item.id,
    title: item.name,
    ...item,
    children: item.children?.length ? mapToTreeData(item.children) : undefined,
  }));
}

function toTreeSelectOptions(
  items: DeptItem[],
): { title: string; value: string; children?: any[] }[] {
  if (!items?.length) return [];
  return items.map((item) => ({
    title: item.name,
    value: item.id,
    children: item.children?.length ? toTreeSelectOptions(item.children) : undefined,
  }));
}

function findNodeById(items: DeptItem[], id: string): DeptItem | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children?.length) {
      const found = findNodeById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function formatDate(val: Date | string | number | null | undefined): string {
  if (!val) return "-";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString("zh-CN");
}

function DeptDetailPanel({
  record,
  treeData,
  treeOptions,
  refetch,
}: {
  record: DeptItem | null;
  treeData: DeptItem[];
  treeOptions: any;
  refetch: () => void;
}) {
  if (!record) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="在左侧目录中点选一项"
        style={{ paddingTop: 24 }}
      />
    );
  }

  return (
    <Flex vertical gap={16}>
      <Flex
        justify="space-between"
        align="center"
        style={{
          borderBottom: "1px solid var(--ant-color-border-secondary)",
          paddingBottom: 12,
        }}
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          {record.name}
        </Typography.Title>
        <Space>
          <UpdateDeptModal
            trigger={<Button type="text" icon={<EditOutlined />} />}
            record={record}
            treeOptions={treeOptions}
            refetch={refetch}
          />
          <DeleteAction title="确定要删除此部门吗?" record={record} refetch={refetch} />
        </Space>
      </Flex>

      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="部门名称">{record.name ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="描述">{record.description || "-"}</Descriptions.Item>
        <Descriptions.Item label="排序">{record.orderNo ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="父部门">
          {record.parentDepartmentId
            ? (findNodeById(treeData, record.parentDepartmentId)?.name ?? record.parentDepartmentId)
            : "无"}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">{formatDate(record.createdAt)}</Descriptions.Item>
        <Descriptions.Item label="更新时间">{formatDate(record.updatedAt)}</Descriptions.Item>
      </Descriptions>
    </Flex>
  );
}

export function DeptProTable({
  list,
  loading,
  refetch,
  total,
}: {
  list: DeptItem[];
  loading: boolean;
  refetch: () => void;
  total: number;
}) {
  const treeList = useMemo(() => buildTree(list), [list]);
  const treeData = useMemo(() => mapToTreeData(treeList), [treeList]);
  const treeOptions = useMemo(() => toTreeSelectOptions(treeList), [treeList]);
  const [selectedKey, setSelectedKey] = useState<string>();

  useEffect(() => {
    if (!treeList.length) {
      setSelectedKey(undefined);
      return;
    }
    const firstId = treeList[0].id;
    if (!selectedKey) {
      setSelectedKey(firstId);
      return;
    }
    const exists = findNodeById(treeList, selectedKey);
    if (!exists) {
      setSelectedKey(firstId);
    }
  }, [treeList, selectedKey]);

  const selectedRecord = useMemo(
    () => (selectedKey ? findNodeById(treeList, selectedKey) : null),
    [treeList, selectedKey],
  );

  return (
    <Spin spinning={loading}>
      <Flex gap={12} align="stretch" style={{ height: "100%" }}>
        <Card
          variant="borderless"
          style={{
            width: 360,
            flexShrink: 0,
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
          styles={{
            body: { paddingBlock: 12, display: "flex", flexDirection: "column", height: "100%" },
          }}
          title={
            <span style={{ color: "var(--ant-color-text-heading)", fontWeight: 600 }}>
              部门结构
              <Typography.Text
                type="secondary"
                style={{ marginLeft: 8, fontSize: 12, fontWeight: 400 }}
              >
                共 {total ?? 0} 项
              </Typography.Text>
            </span>
          }
          extra={
            <Space size="small">
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => refetch?.()}
              >
                刷新
              </Button>
              <CreateDeptModal treeOptions={treeOptions} refetch={refetch} />
            </Space>
          }
        >
          {treeData.length === 0 && !loading ? (
            <Typography.Text type="secondary">暂无部门数据</Typography.Text>
          ) : (
            <div style={{ flex: 1, overflow: "auto", paddingRight: 4 }}>
              <Tree
                showLine={{ showLeafIcon: false }}
                blockNode
                defaultExpandAll
                selectedKeys={selectedKey ? [selectedKey] : []}
                onSelect={(keys) => {
                  const k = keys[0] as string | undefined;
                  if (k) setSelectedKey(k);
                }}
                treeData={treeData}
              />
            </div>
          )}
        </Card>

        <Card
          variant="borderless"
          style={{ flex: 1, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
          styles={{
            body: { paddingBlock: 12, display: "flex", flexDirection: "column", height: "100%" },
          }}
          title={
            <span style={{ color: "var(--ant-color-text-heading)", fontWeight: 600 }}>
              部门详情
            </span>
          }
        >
          <DeptDetailPanel
            record={selectedRecord}
            treeData={treeList}
            treeOptions={treeOptions}
            refetch={refetch}
          />
        </Card>
      </Flex>
    </Spin>
  );
}
