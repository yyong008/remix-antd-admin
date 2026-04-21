import { Button, Form, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "~/components/pro-form-kit";
import { nanoid } from "nanoid";

import { useCreateProfileLinkCategory } from "~/api-client/queries/profile-link-category";

import { FormItems } from "./FormItems";

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
      title="新建分类"
      onOpenChange={() => {}}
      trigger={
        <Button type="primary" size="small" icon={<EditOutlined />}>
          新建
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
        const res = (await create.mutateAsync({ ...values, id })) as {
          code?: number;
          message?: string;
        };
        if (res.code !== 0) {
          message.error(res.message ?? "创建失败");
          return false;
        }
        message.success(res.message ?? "创建成功");
        onCreated?.(id);
        refetch();
        form.resetFields();
        return true;
      }}
    >
      <FormItems />
    </ModalForm>
  );
}
