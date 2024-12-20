import { Form } from "antd";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";
import { blogCategory } from "@/apis-client/admin/blog/category";

export function CreateBlogCategoryModal({
  loading,
  trigger,
  title,
  onOpenChange,
  refetch,
}: any) {
  const [form] = Form.useForm();
  const [create] = blogCategory.useCreateBlogCategoryMutation();
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
