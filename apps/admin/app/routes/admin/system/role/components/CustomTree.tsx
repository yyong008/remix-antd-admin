import { Tree } from "antd";
import type { Key } from "react";

type CustomTreeProps = {
  value?: any;
  onChange?: (v: any) => void;
  menu: any[];
  checkedKeys: any[];
  onCheck: (a?: any, b?: any) => void;
};

function normalizeCheckedKeys(checked: Key[] | { checked: Key[]; halfChecked: Key[] }): Key[] {
  if (Array.isArray(checked)) return checked;
  return checked?.checked ?? [];
}

export function CustomTree(props: CustomTreeProps) {
  const { onChange, menu, checkedKeys, onCheck } = props;
  return (
    <div
      style={{
        maxHeight: Math.min(420, window.innerHeight * 0.5),
        minHeight: 260,
        overflowY: "auto",
        borderRadius: 8,
        border: "1px solid var(--ant-color-border-secondary)",
        backgroundColor: "var(--ant-color-fill-quaternary)",
        padding: "8px 12px",
      }}
      role="region"
      aria-label="菜单权限树"
    >
      <Tree
        style={{ backgroundColor: "transparent" }}
        showLine
        showIcon
        checkable
        selectable
        treeData={menu}
        checkedKeys={checkedKeys}
        onCheck={(checked, info) => {
          const keys = normalizeCheckedKeys(checked);
          onCheck(keys, info);
          const menus = info.checkedNodes?.map((n: any) => ({
            id: n.id ?? n.key,
            key: n.key,
            value: n.value ?? n.key,
          }));
          onChange?.(menus);
        }}
      />
    </div>
  );
}
