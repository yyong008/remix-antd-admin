import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./FormItems";
import { ModalForm } from "@ant-design/pro-components";

export function UpdateLinkCategoryModal({ record, refetch }: any) {
  const [form] = Form.useForm();
  const [updateLinkCategoryById, other] = [
    (...args: any): any => {},
    { isLoading: false },
  ];
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="修改Link分类"
      initialValues={{
        ...record,
      }}
      onOpenChange={(c) => {}}
      trigger={<Button type="link" icon={<EditOutlined />}></Button>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      loading={other.isLoading}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result = await updateLinkCategoryById({
          id: record.id,
          ...values,
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
