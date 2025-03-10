import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";

export default function CreateCategoryNewsModal({ trigger }: any) {
  const [form] = Form.useForm();

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={"创建Link分类"}
      onOpenChange={(c) => {
        if (!c) {
          return;
        }
      }}
      trigger={
        trigger ?? (
          <Button type={"primary"} icon={<EditOutlined />}>
            {"新建"}
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async () => {
        form.resetFields();
        return true;
      }}
    ></ModalForm>
  );
}
