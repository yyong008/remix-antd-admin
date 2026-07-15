import { EditOutlined, ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Empty,
  Flex,
  Form,
  Popconfirm,
  Space,
  Spin,
  Tree,
  Typography,
  message,
} from "antd";
import type { DataNode } from "antd/es/tree";
import { useEffect, useMemo, useState } from "react";
import { useDeleteDept } from "~/api-client/queries/system/system-dept";
import { CreateDeptModal } from "./create-dept-modal";
import { UpdateDeptModal } from "./update-dept-modal";
import { m } from "~/paraglide/messages";

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

function formatDateTime(val: Date | string | number | null | undefined): string {
  if (!val) return "-";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString("zh-CN");
}

function DeleteAction({ record, refetch }: any) {
  const deleteDepartments = useDeleteDept();
  return (
    <Form>
      <Popconfirm
        title={m.system_dept_confirm_delete()}
        onConfirm={async () => {
          const ids = [record.id];
          await deleteDepartments.mutateAsync({ ids });
          refetch?.();
          message.success(m.system_delete_success());
        }}
      >
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          loading={deleteDepartments.isPending}
        />
      </Popconfirm>
    </Form>
  );
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
        description={m.system_dept_detail_empty()}
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
          <DeleteAction record={record} refetch={refetch} />
        </Space>
      </Flex>

      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label={m.system_dept_detail_name()}>
          {record.name ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label={m.system_description()}>
          {record.description || "-"}
        </Descriptions.Item>
        <Descriptions.Item label={m.system_dept_field_order()}>
          {record.orderNo ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label={m.system_dept_detail_parent()}>
          {record.parentDepartmentId
            ? (findNodeById(treeData, record.parentDepartmentId)?.name ?? record.parentDepartmentId)
            : m.system_dept_detail_none()}
        </Descriptions.Item>
        <Descriptions.Item label={m.system_created_at()}>
          {formatDateTime(record.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label={m.system_updated_at()}>
          {formatDateTime(record.updatedAt)}
        </Descriptions.Item>
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
              {m.system_dept_tree_title()}
              <Typography.Text
                type="secondary"
                style={{ marginLeft: 8, fontSize: 12, fontWeight: 400 }}
              >
                {m.system_dept_tree_items({ total: String(total ?? 0) })}
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
                {m.system_refresh()}
              </Button>
              <CreateDeptModal treeOptions={treeOptions} refetch={refetch} />
            </Space>
          }
        >
          {treeData.length === 0 && !loading ? (
            <Typography.Text type="secondary">{m.system_dept_toast_empty()}</Typography.Text>
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
              {m.system_dept_detail_title()}
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
