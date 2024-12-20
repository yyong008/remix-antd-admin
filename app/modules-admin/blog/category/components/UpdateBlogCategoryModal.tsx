import { Form } from "antd";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";

export function UpdateBlogCategoryModal({
  loading,
  trigger,
  title,
  onOpenChange,
  onFinish,
}: any) {
  const [form] = Form.useForm();

  return (
    <ModalForm
      loading={loading}
      key={Date.now()}
      preserve={false}
      title={title}
      onOpenChange={(c) => onOpenChange(c, form)}
      trigger={trigger}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={(values) => onFinish(values, form)}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
