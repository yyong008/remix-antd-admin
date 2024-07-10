import * as _icon from "@ant-design/icons";

import { Button, Form, Popconfirm, message } from "antd";

import { useDeleteProfileLinkCategoryByIdsMutation } from "@/apis-client/admin/profile/link-category";

const { DeleteOutlined } = _icon;

type DeleteItProps = {
  refetch: any;
  record: any;
  title: string;
};

export function DeleteIt({ record, title, refetch }: DeleteItProps) {
  const [deletePrpfileLinkCategory] =
    useDeleteProfileLinkCategoryByIdsMutation();

  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={async () => {
          const result = await deletePrpfileLinkCategory([record.id]);
          if (result.data?.code !== 0) {
            message.error(result.data?.message);
            return false;
          }
          message.success(result.data?.message);
          refetch();
          return true;
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Form>
  );
}
