import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./FormItems";
import { ModalForm } from "@ant-design/pro-components";
import { createProfileLinkCategory } from "~/admin/apis/admin/profile";
import { useTranslation } from "react-i18next";
import { useTransition } from "react";

export function CreateLinkCategoryModal({ refetch }: any) {
  const [form] = Form.useForm();
  const { t } = useTranslation("link");
  const [isPending, startTransition] = useTransition();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={t("category.modal.create.title")}
      onOpenChange={() => {}}
      trigger={
        <Button type="primary" icon={<EditOutlined />}>
          {t("category.action.create")}
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
          const result: any = await createProfileLinkCategory(values);
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
