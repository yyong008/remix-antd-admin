import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItem";

export function CreateNewsCategoryModal({ refetch }: any) {
  const [form] = Form.useForm();
  const [createNewsCategory, other] = [
    (...args: any): any => {},
    { isLoading: false },
  ];

  return (
    <ModalForm
      loading={other.isLoading}
      key={Date.now()}
      preserve={false}
      title="创建新建分类"
      onOpenChange={() => {}}
      trigger={
        <Button type={"primary"} icon={<EditOutlined />}>
          新建新闻分类
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
        const result = await createNewsCategory(values);
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
      <ModalFormItems />
    </ModalForm>
  );
}
