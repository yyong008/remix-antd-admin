import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { EditOutlined } from "@ant-design/icons";
import { createDoc } from "@/admin/apis/admin/docs";
import { useTransition } from "react";

export function ChangeLogCreateModal({ refetch }: any) {
  const [form] = Form.useForm();

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="创建日志"
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
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result: any = await createDoc(values);
        if (result && result?.code !== 0) {
          message.error(result?.message);
          return true;
        }
        message.success(result?.message);
        refetch();
        form.resetFields();
        return false;
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
