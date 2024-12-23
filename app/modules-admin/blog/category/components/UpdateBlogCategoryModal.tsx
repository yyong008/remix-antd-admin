import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";
import { blogCategory } from "@/apis-client/admin/blog/category";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export function UpdateBlogCategoryModal({
  loading,
  trigger,
  title,
  record,
  refetch,
}: any) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const [update] = blogCategory.useUpdateBlogCategoryByIdMutation();
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
      onFinish={async (values) => {
        values.id = record.id;
        const result = await update(values).unwrap();
        if (result && result.code !== 0) {
          message.error(result.message);
          return false;
        }
        message.success(result.message);
        refetch?.();
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
