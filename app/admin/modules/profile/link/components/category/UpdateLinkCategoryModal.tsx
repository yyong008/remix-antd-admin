import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./FormItems";
import { ModalForm } from "@ant-design/pro-components";
import { updateProfileLinkCategoryById } from "~/admin/apis/admin/profile";
import { useTransition } from "react";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useTranslation } from "react-i18next";

export function UpdateLinkCategoryModal({ record, refetch }: any) {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const { colorPrimary } = useColorPrimary();
  const { t } = useTranslation("link");
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={t("category.modal.update.title")}
      initialValues={{
        ...record,
      }}
      onOpenChange={(c) => {
        if (c) {
          form.setFieldsValue({
            ...record,
          });
        }
      }}
      trigger={
        <Button
          type="link"
          style={{ color: colorPrimary }}
          icon={<EditOutlined />}
        >
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      loading={isPending}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        startTransition(async () => {
          const result: any = await updateProfileLinkCategoryById({
            id: record.id,
            ...values,
          });
          if (result?.code !== 0) {
            message.error(result?.message);
            return;
          }
          message.success(result?.message);
          refetch();
          form.resetFields();
          return;
        });
      }}
    >
      <FormItems />
    </ModalForm>
  );
}
