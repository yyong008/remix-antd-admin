import * as _icon from "@ant-design/icons";

import { Button, Form, Popconfirm, message } from "antd";

import { useDeleteChangelogByIdsMutation } from "@/apis-client/admin/docs/changelog";

const { DeleteOutlined } = _icon;

type DeleteItProps = {
  refetch: any;
  record: any;
  title: string;
};

export function DeleteIt({ record, title, refetch }: DeleteItProps) {
  const [form] = Form.useForm();
  const [deleteByIds] = useDeleteChangelogByIdsMutation();
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

          const result = await deleteByIds(data);
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
