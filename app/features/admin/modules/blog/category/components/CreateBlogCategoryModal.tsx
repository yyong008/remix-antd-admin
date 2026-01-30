import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";

export function CreateBlogCategoryModal({
  loading,
  trigger,
  title,
  onOpenChange,
  refetch,
}: any) {
  const [form] = Form.useForm();
  const [create] = [(...args: any): any => {}]; // todo
  return (
    <ModalForm
      loading={loading}
      key={Date.now()}
      preserve={false}
      title={title}
      onOpenChange={(c) => {
        onOpenChange?.();
      }}
      trigger={
        trigger ?? (
          <Button type={"primary"} icon={<EditOutlined />}>
            新建
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
      onFinish={async (values) => {
        const result = await create(values);
        if (result.data.code === 1) {
          return false;
        }
        refetch?.();
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
