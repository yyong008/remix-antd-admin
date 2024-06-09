import * as _icon from "@ant-design/icons";

import { Button, Form, Popconfirm } from "antd";

const { DeleteOutlined } = _icon;

type DeleteItProps = {
  fetcher: any;
  record: any;
  title: string;
};

export function DeleteIt({ fetcher, record, title }: DeleteItProps) {
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={() => {
          fetcher.submit(
            { ids: [record.id] },
            { method: "DELETE", encType: "application/json" },
          );
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Form>
  );
}
