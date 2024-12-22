import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export function UpdateBlogCategoryModal({
  loading,
  trigger,
  title,
  onOpenChange,
  onFinish,
  record,
}: any) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  return (
    <ModalForm
      loading={loading}
      key={Date.now()}
      preserve={false}
      title={title}
      onOpenChange={(c) => {
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={
        trigger ?? (
          <Button
            type={"link"}
            icon={<EditOutlined style={{ color: colorPrimary }} />}
          ></Button>
        )
      }
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
