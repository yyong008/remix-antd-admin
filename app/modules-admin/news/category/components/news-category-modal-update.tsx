import * as ic from "@ant-design/icons";

import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { useAntdThemeToken } from "~/hooks";
import { useUpdateNewsCategoryByIdMutation } from "~/apis-client/admin/news/category";

const { EditOutlined } = ic;

export function NewsCategoryModalUpdate({ record, refetch }: any) {
  const [form] = Form.useForm();
  const token = useAntdThemeToken();
  const iconStyles = { style: { color: token.colorPrimary } };
  const [updateNewsCategoryById, other] = useUpdateNewsCategoryByIdMutation();

  return (
    <ModalForm
      loading={other.isLoading}
      key={Date.now()}
      preserve={false}
      title={record?.id ? "修改新闻分类" : "创建新建分类"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={
        <Button
          type={!record.id ? "primary" : "link"}
          icon={<EditOutlined {...iconStyles} />}
        >
          {!record.id ? "新建" : ""}
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
        const result = await updateNewsCategoryById({
          ...values,
          id: record.id,
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
