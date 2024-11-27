import { Tree } from "antd";

type CustomTreeProps = {
  value?: any;
  onChange?: (v: any) => void;
  menu: any[];
  checkedKeys: any[];
  onCheck: (a?: any, b?: any) => void;
};

export function CustomTree(props: CustomTreeProps) {
  const { onChange, menu, checkedKeys, onCheck } = props;
  return (
    <div className="h-[300px] overflow-y-auto">
      <Tree
        showLine
        showIcon
        checkable
        selectable
        treeData={menu}
        checkedKeys={checkedKeys}
        onCheck={(e, d) => {
          onCheck(e);
          onChange?.(
            d.checkedNodes?.map(({ id, key, value }) => ({ id, key, value })),
          );
        }}
      />
    </div>
  );
}
