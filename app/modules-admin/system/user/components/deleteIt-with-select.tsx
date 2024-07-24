import { Button, Popconfirm } from "antd";

export function DeleteItWithSelect({
  selectedRow,
  fetcher,
  setSelectedRow,
}: any) {
  return selectedRow.length > 0 ? (
    <Popconfirm
      key="del"
      title="确定要删除吗？"
      onConfirm={() => {
        fetcher.submit(
          {
            ids: selectedRow.map((row: any) => row.id),
          },
          {
            method: "DELETE",
            encType: "application/json",
          },
        );
        setSelectedRow([]);
      }}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  ) : (
    <></>
  );
}
