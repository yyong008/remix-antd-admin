import { Button, Form, Popconfirm, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

type DeleteItProps = {
  refetch: any;
  record: any;
  title: string;
};

export function DeleteIt({ record, title, refetch }: DeleteItProps) {
  const [form] = Form.useForm();
  const [deleteByIds] = [
    (data: any) => {
      console.log(data);
    },
  ];
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={async () => {
          const data = {
            ids: [] as number[],
          };
          if (record.id) {
            data.ids = [record.id];
          }

          const result: any = await deleteByIds(data);
          if (result.data?.code !== 0) {
            message.error(result.data?.message);
            return false;
          }
          message.success(result.data?.message);
          refetch();
          form.resetFields();
          return true;
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Form>
  );
}
