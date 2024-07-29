import { Button, Popconfirm } from "antd";

type ToolbarDeleteButtonUI = {
  selectedRow: any[];
  onConfirm: (...args: any) => any;
};

export function ToolbarDeleteButtonUI({ selectedRow, onConfirm }: any) {
  return selectedRow.length > 0 ? (
    <Popconfirm
      key="del"
      title="Are your sure?"
      onConfirm={() => {
        onConfirm();
      }}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  ) : (
    <></>
  );
}
