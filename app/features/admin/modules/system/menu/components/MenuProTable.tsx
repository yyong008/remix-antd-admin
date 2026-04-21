import { ReloadOutlined } from "@ant-design/icons";
import {
  AntdIcon,
  CacheType,
  FormatTime,
  LinkType,
  MenuType,
  ShowType,
  StatusType,
} from "@/components/common";
import {
  Button,
  Card,
  Descriptions,
  Empty,
  Grid,
  Space,
  Spin,
  Tooltip,
  Tree,
  Typography,
  theme,
} from "antd";
import type { DataNode } from "antd/es/tree";
import { useEffect, useMemo, useState } from "react";

import { CreateMenuModal } from "./CreateMenuModal";
import { DeleteAction } from "./DeleteAction";
import UpdateMenuModal from "./UpdateMenuModal";

import "./menu-tree.css";

export type Status = {
  color: string;
  text: string;
};

export type TableListItem = {
  id: number;
  parent_menu_id: number | null;
  key: number;
  name: string;
  icon: string;
  containers: number;
  orderNo: number;
  path: string;
  creator: string;
  status: Status;
  createdAt: number;
  updatedAt: number;
  isLink: 0 | 1;
};

type SystemMenuProps = {
  menuRaw: any[];
  menuNotPerm: any[];
  loading: boolean;
  refetch: any;
  total: number;
};

function mapToTreeData(items: any[] | undefined): DataNode[] {
  if (!items?.length) return [];
  return items.map((item) => ({
    ...item,
    /** 必须在展开字段之后：接口里的 `key` 会覆盖，否则 Tree 选中与详情 id 对不上 */
    key: String(item.id),
    title: item.name,
    children: item.children?.length ? mapToTreeData(item.children) : undefined,
  })) as DataNode[];
}

function findNodeById(items: any[], id: string): (TableListItem & Record<string, unknown>) | null {
  for (const item of items) {
    if (String(item.id) === id) return item;
    if (item.children?.length) {
      const found = findNodeById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function MenuDetailPanel({
  record,
  menuNotPerm,
  refetch,
}: {
  record: (TableListItem & Record<string, unknown>) | null;
  menuNotPerm: any[];
  refetch: () => void;
}) {
  const { token } = theme.useToken();
  if (!record) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="在左侧目录中点选一项"
        style={{ paddingTop: 24 }}
      />
    );
  }

  const r = record as TableListItem & {
    description?: string;
    path_file?: string;
    permission?: string;
    type?: number;
    isShow?: number;
    isCache?: number;
  };
  const pathText = r.path?.trim() || "—";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          borderBottom: "1px solid var(--ant-color-border-secondary)",
          paddingBottom: 12,
        }}
      >
        <div style={{ display: "flex", minWidth: 0, alignItems: "flex-start", gap: 12 }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: token.colorFillSecondary,
            }}
          >
            <AntdIcon name={r.icon} style={{ fontSize: 20, color: "var(--ant-color-text)" }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <Typography.Title level={5} style={{ marginBottom: 4, marginTop: 0 }}>
              {r.name}
            </Typography.Title>
            {r.description?.trim() ? (
              <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                {r.description}
              </Typography.Text>
            ) : null}
          </div>
        </div>
        <Space wrap style={{ flexShrink: 0 }}>
          <UpdateMenuModal record={r} refetch={refetch} menuNotPerm={menuNotPerm} />
          <DeleteAction title="确定要删除此菜单吗?" record={r} refetch={refetch} />
        </Space>
      </div>

      <Descriptions
        bordered
        size="small"
        column={1}
        labelStyle={{ width: 108, color: "var(--ant-color-text-secondary)" }}
        className="menu-detail-descriptions"
      >
        <Descriptions.Item label="类型">
          <MenuType type={(r.type ?? 1) as 1 | 2 | 3} />
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          <StatusType status={r.status} />
        </Descriptions.Item>
        <Descriptions.Item label="可见 / 外链 / 缓存">
          <Space wrap size={[4, 4]}>
            <ShowType isShow={r.isShow} />
            <LinkType isLink={r.isLink} />
            <CacheType isCache={r.isCache} />
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="排序">{r.orderNo ?? "—"}</Descriptions.Item>
        <Descriptions.Item label="路由路径">
          {r.isLink ? (
            <a href={r.path} target="_blank" rel="noreferrer" style={{ wordBreak: "break-all" }}>
              {pathText}
            </a>
          ) : (
            <Typography.Text
              style={{ wordBreak: "break-all", fontFamily: "monospace", fontSize: 14 }}
            >
              {pathText}
            </Typography.Text>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="路由文件">
          <Typography.Text
            style={{ wordBreak: "break-all", fontFamily: "monospace", fontSize: 14 }}
          >
            {r.path_file || "—"}
          </Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="权限标识">
          {r.permission ? <Typography.Text code>{String(r.permission)}</Typography.Text> : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          <FormatTime timeStr={r.createdAt} />
        </Descriptions.Item>
        <Descriptions.Item label="更新时间">
          <FormatTime timeStr={r.updatedAt} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export function MenuProTable(props: SystemMenuProps) {
  const { menuRaw = [], menuNotPerm = [], refetch, total } = props;
  const screens = Grid.useBreakpoint();
  const showTreeStatus = !!screens.sm;
  const treeData = useMemo(() => mapToTreeData(menuRaw), [menuRaw]);
  const [selectedKey, setSelectedKey] = useState<string>();

  useEffect(() => {
    if (!menuRaw.length) {
      setSelectedKey(undefined);
      return;
    }
    const firstId = String(menuRaw[0].id);
    if (!selectedKey) {
      setSelectedKey(firstId);
      return;
    }
    const exists = findNodeById(menuRaw, selectedKey);
    if (!exists) {
      setSelectedKey(firstId);
    }
  }, [menuRaw, selectedKey]);

  const selectedRecord = useMemo(() => {
    if (!selectedKey) return null;
    return findNodeById(menuRaw, selectedKey);
  }, [menuRaw, selectedKey]);

  const titleRender = (node: any) => {
    const r = node as TableListItem & { description?: string; type?: number };
    const menuType = (r.type ?? 1) as 1 | 2 | 3;
    return (
      <div style={{ display: "flex", width: "100%", minWidth: 0, alignItems: "center", gap: 8 }}>
        <AntdIcon name={r.icon} style={{ flexShrink: 0, color: "var(--ant-color-text)" }} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <TooltipTitle name={r.name} description={r.description} />
        </div>
        <span style={{ display: "flex", flexShrink: 0, alignItems: "center", gap: 6 }}>
          <MenuType type={menuType} />
          {showTreeStatus ? <StatusType status={r.status} /> : null}
        </span>
      </div>
    );
  };

  return (
    <Spin spinning={props.loading}>
      <div style={{ display: "flex", gap: 12 }}>
        <Card
          variant="borderless"
          style={{ width: 360, flexShrink: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
          styles={{ body: { paddingBlock: 12 } }}
          title={
            <span style={{ color: "var(--ant-color-text-heading)", fontWeight: 600 }}>
              目录结构
              <Typography.Text
                type="secondary"
                style={{ marginLeft: 8, verticalAlign: "middle", fontSize: 12, fontWeight: 400 }}
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
              <CreateMenuModal menuNotPerm={menuNotPerm} refetch={refetch} />
            </Space>
          }
        >
          {treeData.length === 0 && !props.loading ? (
            <Typography.Text type="secondary">暂无菜单数据</Typography.Text>
          ) : (
            <div
              style={{
                maxHeight: Math.min(720, window.innerHeight * 0.68),
                overflow: "auto",
                paddingRight: 4,
              }}
            >
              <Tree
                className="admin-menu-tree"
                showLine={{ showLeafIcon: false }}
                blockNode
                defaultExpandAll
                selectedKeys={selectedKey ? [selectedKey] : []}
                onSelect={(keys) => {
                  const k = keys[0] as string | undefined;
                  if (k) setSelectedKey(k);
                }}
                treeData={treeData}
                titleRender={titleRender}
              />
            </div>
          )}
        </Card>

        <Card
          variant="borderless"
          style={{ flex: 1, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
          styles={{ body: { paddingBlock: 12 } }}
          title={
            <span style={{ color: "var(--ant-color-text-heading)", fontWeight: 600 }}>
              节点详情
            </span>
          }
        >
          <MenuDetailPanel record={selectedRecord} menuNotPerm={menuNotPerm} refetch={refetch} />
        </Card>
      </div>
    </Spin>
  );
}

function TooltipTitle({ name, description }: { name: string; description?: string }) {
  const inner = (
    <span
      style={{
        display: "block",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontWeight: 500,
        color: "var(--ant-color-text-heading)",
      }}
    >
      {name}
    </span>
  );
  if (!description?.trim()) return inner;
  return <Tooltip title={description}>{inner}</Tooltip>;
}
