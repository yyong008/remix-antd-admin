import * as ic from "@ant-design/icons";

import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { useCreateProfileLinkCategoryMutation } from "@/apis-client/admin/profile/link-category";

const { EditOutlined } = ic;

export function LinkCategoryModalCreate({ refetch }: any) {
  const [form] = Form.useForm();
  const [createLinkCategory, other] = useCreateProfileLinkCategoryMutation();

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="修改Link分类"
      onOpenChange={(c) => {}}
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
      <ProFormText
        name="name"
        label="标签名"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="请输入"
        rules={[
          {
            required: false,
            message: "请输入用户名",
          },
        ]}
      />
    </ModalForm>
  );
}
