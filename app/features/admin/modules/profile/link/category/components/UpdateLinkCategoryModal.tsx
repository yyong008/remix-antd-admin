import { Button, Form, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "~/components/pro-form-kit";

import { useUpdateProfileLinkCategory } from "~/api-client/queries/profile-link-category";

import { FormItems } from "./FormItems";

export function UpdateLinkCategoryModal({
  record,
  refetch,
  open,
  onClose,
}: {
  record: Record<string, unknown> & { id: string };
  refetch: () => void;
  open?: boolean;
  onClose?: () => void;
}) {
  const [form] = Form.useForm();
  const update = useUpdateProfileLinkCategory();

  return (
    <ModalForm
      preserve={false}
      title="编辑分类"
      initialValues={{ ...record }}
      onOpenChange={(isOpen) => {
        if (isOpen && record?.id) {
          form.setFieldsValue({ ...record });
        }
        if (!isOpen) {
          onClose?.();
        }
      }}
      trigger={<Button type="link" size="small" icon={<EditOutlined />} />}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => {
          form.resetFields();
          onClose?.();
        },
      }}
      loading={update.isPending as boolean}
      submitTimeout={2000}
      onFinish={async (values: Record<string, unknown>) => {
        const res = (await update.mutateAsync({
          ...values,
          id: record.id,
        })) as { code?: number; message?: string };
        if (res.code !== 0) {
          message.error(res.message ?? "更新失败");
          return false;
        }
        message.success(res.message ?? "已更新");
        refetch();
        form.resetFields();
        onClose?.();
        return true;
      }}
    >
      <FormItems />
    </ModalForm>
  );
}
