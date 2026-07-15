import { Button, Form, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "~/components/pro-form-kit";
import { nanoid } from "nanoid";

import { useCreateProfileLinkCategory } from "~/api-client/queries/profile/profile-link-category";
import { m } from "~/paraglide/messages";

import { FormItems } from "./form-items";

export function CreateLinkCategoryModal({
  refetch,
  onCreated,
}: {
  refetch: () => void;
  onCreated?: (id: string) => void;
}) {
  const [form] = Form.useForm();
  const create = useCreateProfileLinkCategory();

  return (
    <ModalForm
      preserve={false}
      title={m.profile_link_create_category_title()}
      onOpenChange={() => {}}
      trigger={
        <Button type="primary" size="small" icon={<EditOutlined />}>
          {m.profile_link_create_category()}
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => form.resetFields(),
      }}
      loading={create.isPending}
      submitTimeout={2000}
      onFinish={async (values: Record<string, unknown>) => {
        const id = nanoid();
        try {
          await create.mutateAsync({ ...values, id });
          message.success(m.profile_link_toast_created());
          onCreated?.(id);
          refetch();
          form.resetFields();
          return true;
        } catch (e) {
          message.error(e instanceof Error ? e.message : m.profile_link_toast_create_failed());
          return false;
        }
      }}
    >
      <FormItems />
    </ModalForm>
  );
}
