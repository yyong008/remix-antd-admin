import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./FormItems";
import { ModalForm } from "@ant-design/pro-components";

export function CreateLinkCategoryModal({ refetch }: any) {
  const [form] = Form.useForm();
  const [createLinkCategory, other] = [
    (...args: any): any => {},
    { isLoading: false },
  ];

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="修改Link分类"
      onOpenChange={() => {}}
      trigger={
        <Button type="primary" icon={<EditOutlined />}>
          新建
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      loading={other.isLoading}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result = await createLinkCategory(values);
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
