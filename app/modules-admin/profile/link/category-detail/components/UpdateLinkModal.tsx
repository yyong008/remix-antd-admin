import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./FormItems";
import { ModalForm } from "@ant-design/pro-components";
import { useParams } from "react-router";
import { useUpdateProfileLinkByIdMutation } from "~/apis-client/admin/profile/link";

export function UpdateLinkModal({ record, refetch }: any) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [updateProfileLinkById, other] = useUpdateProfileLinkByIdMutation();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="更新 link"
      loading={other.isLoading}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={<Button type={"link"} icon={<EditOutlined />}></Button>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const vals = {
          ...values,
        };

        if (id) {
          vals.categoryId = Number(id);
        }
        const result = await updateProfileLinkById({
          id: record.id,
          ...vals,
        });
        if (result.data?.code !== 0) {
          message.error(result.data?.message);
          return false;
        }
        message.success(result.data?.message);
        refetch();
        form.resetFields();
        return true;
      }}
    >
      <FormItems />
    </ModalForm>
  );
}
