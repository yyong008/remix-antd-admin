import { Form, message } from "antd";
import { ModalForm } from "~/components/pro-form-kit";

import { useUpdateProfileLinkCategory } from "~/api-client/queries/profile/profile-link-category";
import { m } from "~/paraglide/messages";

import { FormItems } from "./form-items";

export function UpdateLinkCategoryModal({
  record,
  refetch,
  open: _open,
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
      title={m.profile_link_update_category_title()}
      initialValues={{ ...record }}
      open={_open}
      onOpenChange={(isOpen) => {
        if (isOpen && record?.id) {
          form.setFieldsValue({ ...record });
        }
        if (!isOpen) {
          onClose?.();
        }
      }}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => {
          form.resetFields();
          onClose?.();
        },
      }}
      loading={update.isPending}
      submitTimeout={2000}
      onFinish={async (values: Record<string, unknown>) => {
        try {
          await update.mutateAsync({ ...values, id: record.id });
          message.success(m.profile_link_toast_updated());
          refetch();
          form.resetFields();
          onClose?.();
          return true;
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.profile_link_toast_update_failed());
          return false;
        }
      }}
    >
      <FormItems />
    </ModalForm>
  );
}
