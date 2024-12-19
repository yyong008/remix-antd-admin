import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { EditOutlined } from "@ant-design/icons";
import { useCreateNewsCategoryMutation } from "@/apis-client/admin/news/category";

export function NewsCategoryModalCreate({ refetch }: any) {
  const [form] = Form.useForm();
  const [createNewsCategory, other] = useCreateNewsCategoryMutation();

  return (
    <ModalForm
      loading={other.isLoading}
      key={Date.now()}
      preserve={false}
      title="创建新建分类"
      onOpenChange={(c) => {}}
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
      <ProFormText
        name="name"
        label="标签名"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
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
            message: "请输入",
          },
        ]}
      />
    </ModalForm>
  );
}
