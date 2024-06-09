import * as ic from "@ant-design/icons";

import { Button, Form } from "antd";
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { useSubmit } from "@remix-run/react";

const { EditOutlined } = ic;

export default function ChangeLogModal({ trigger, record }: any) {
  const [form] = Form.useForm();
  const submit = useSubmit();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={record?.id ? "修改更新日志" : "更新日志"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={
        trigger ?? (
          <Button
            type={!record.id ? "primary" : "link"}
            icon={<EditOutlined />}
          >
            {!record.id ? "新建" : ""}
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const vals = { ...values };
        if (record.id) {
          vals.id = record.id;
        }
        submit(vals, {
          method: record.id ? "PUT" : "POST", // 修改或新建
          encType: "application/json",
        });
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
