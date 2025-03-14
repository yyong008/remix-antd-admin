import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./FormItems";
import { ModalForm } from "@ant-design/pro-components";
import { useParams } from "react-router";
import { readProfileLinkUserCategoryAll, createProfileLink } from "~/admin/apis/admin/profile";
import { useSimplePage } from "~/hooks/useSimplePage";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

export function LinkModalCreate({ refetch }: any) {
  const [isPending, startTransition] = useTransition();
  const userCategoryAll = useSimplePage(readProfileLinkUserCategoryAll);
  const [form] = Form.useForm();
  const { id } = useParams();
  const { t } = useTranslation("link");
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={t("link.modal.create.title")}
      onOpenChange={() => {}}
      loading={isPending}
      trigger={
        <Button type={"primary"} icon={<EditOutlined />}>
          {t("link.action.create")}
        </Button>
      }
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
          const result: any = await createProfileLink(vals);
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
      <FormItems userCategoryAll={userCategoryAll.data?.list || []} />
    </ModalForm>
  );
}
