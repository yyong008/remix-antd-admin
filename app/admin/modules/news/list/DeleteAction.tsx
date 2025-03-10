import { Button, Form, Popconfirm, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

type DeleteActionProps = {
  record: any;
  title: string;
  refetch: any;
};

export function DeleteAction(props: DeleteActionProps) {
  const { record, title, refetch } = props;
  const [deleteIt, { isLoading }] = [
    (...args: any[]): any => {},
    { isLoading: false },
  ];
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={async () => {
          const ids = [record.id];

          const result = await deleteIt({ ids }).unwrap();

          if (result.code !== 0) {
            message.error(result.message ?? "删除失败");
            return;
          }

          refetch?.();
          message.success("删除成功");
        }}
      >
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          loading={isLoading}
        />
      </Popconfirm>
    </Form>
  );
}
