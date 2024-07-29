import * as ic from "@ant-design/icons";

import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { useParams } from "@remix-run/react";
import { useUpdateProfileLinkByIdMutation } from "~/apis-client/admin/profile/link";

const { EditOutlined } = ic;

export function LinkModalUpdate({ record, refetch }: any) {
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
      <ProFormText
        name="name"
        label="链接名"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="url"
        label="链接地址"
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
