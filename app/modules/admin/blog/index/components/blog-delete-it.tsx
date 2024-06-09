import * as as from "~/constants/actions";
import * as ic from "@ant-design/icons";

import { Button, Form, Popconfirm } from "antd";

const { DeleteOutlined } = ic;

type DeleteItProps = {
  fetcher: any;
  record: any;
  title?: string;
};

export function BlogDeleteIt({ fetcher, record, title }: DeleteItProps) {
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={() => {
          const data = {
            type: as.ACTION_DELETE_BLOG,
            data: { ids: [record.id] },
          };
          fetcher.submit(data, {
            method: "DELETE",
            encType: "application/json",
          });
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Form>
  );
}
