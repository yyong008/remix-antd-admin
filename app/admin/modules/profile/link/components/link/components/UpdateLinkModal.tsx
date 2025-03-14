import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./FormItems";
import { ModalForm } from "@ant-design/pro-components";
import { useParams } from "react-router";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { readProfileLinkUserCategoryAll, updateProfileLinkById } from "~/admin/apis/admin/profile";
import { useSimplePage } from "~/hooks/useSimplePage";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

export function UpdateLinkModal({ record, refetch }: any) {
  const [isPending, startTransition] = useTransition();
  const userCategoryAll = useSimplePage(readProfileLinkUserCategoryAll);
  const { colorPrimary } = useColorPrimary();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { t } = useTranslation("link");
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={t("link.modal.update.title")}
      loading={isPending}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
          categoryId: record.category.id,
        });
      }}
      trigger={<Button type={"link"} icon={<EditOutlined style={{ color: colorPrimary }}  />}></Button>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        startTransition(async () => {
          const vals = {
            ...values,
          };
  
          if (id) {
            vals.categoryId = Number(id);
          }
          const result: any = await updateProfileLinkById({
            id: record.id,
            ...vals,
          });
          if (result?.code !== 0) {
            message.error(result?.message);
            return ;
          }
          message.success(result?.message);
          refetch();
          form.resetFields();
          return ;
        })
      }}
    >
      <FormItems userCategoryAll={userCategoryAll.data?.list || []} />
    </ModalForm>
  );
}
