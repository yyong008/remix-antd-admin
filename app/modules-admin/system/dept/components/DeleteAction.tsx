import { Button, Form, Popconfirm, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { systemDeptApi } from "@/apis-client/admin/system/dept/index";

type DeleteActionProps = {
  record: any;
  title: string;
};

export function DeleteAction(props: DeleteActionProps) {
  const { record, title } = props;
  const [deleteDepartments, { isLoading }] =
    systemDeptApi.useDeletesystemDeptByIdsMutation();
  return (
    <Form>
      <Popconfirm
        title={title || "确定要删除吗?"}
        onConfirm={async () => {
          const ids = [record.id];

          const result = await deleteDepartments(ids).unwrap();

          if (result.code !== 0) {
            message.error(result.message ?? "删除失败");
            return;
          }

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
