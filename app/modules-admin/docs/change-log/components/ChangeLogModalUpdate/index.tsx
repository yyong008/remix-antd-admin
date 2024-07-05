import * as ic from "@ant-design/icons";

import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { useUpdateChangelogByIdMutation } from "@/apis-client/admin/docs/changelog";

const { EditOutlined } = ic;

export default function ChangeLogUpdateModal({ record, refetch }: any) {
  const [form] = Form.useForm();

  const [updateChangelogById, other] = useUpdateChangelogByIdMutation();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="更新日志"
      loading={other.isLoading}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={<Button type="link" icon={<EditOutlined />}></Button>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const data = { ...values };
        if (record.id) {
          data.id = record.id;
        }
        const result = await updateChangelogById(data);
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
        name="publish_version"
        label="版本"
        placeholder="请输入版本号"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormSelect
        name="type"
        label="更新类型"
        placeholder="更新类型"
        rules={[
          {
            required: true,
            message: "请选择",
          },
        ]}
        options={[
          {
            label: "重大更新",
            value: 1,
          },
          {
            label: "功能更新",
            value: 2,
          },
          {
            label: "修复Bug",
            value: 3,
          },
        ]}
      />
      <ProFormText
        name="publish_name"
        label="发布人"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormDateTimePicker
        name="publish_time"
        label="发布日期"
        placeholder="发布日期"
        rules={[
          {
            required: true,
            message: "发布日期",
          },
        ]}
      />
      <ProFormText
        name="url"
        label="跳转地址"
        placeholder="跳转地址"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea
        name="content"
        label="更新内容"
        placeholder="更新内容"
        rules={[
          {
            required: true,
            message: "请输入更新内容",
          },
        ]}
      />
    </ModalForm>
  );
}
