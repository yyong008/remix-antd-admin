import * as ic from "@ant-design/icons";

import { Button, Form } from "antd";
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

const { EditOutlined } = ic;

export default function DeptModal({ trigger, record, fetcher }: any) {
  const [form] = Form.useForm();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={record?.id ? "修改用户" : "创建用户"}
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
          <Button type={record ? "primary" : "link"} icon={<EditOutlined />}>
            {record ? "新建" : ""}
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
        fetcher.submit(vals, {
          method: record.id ? "PUT" : "POST", // 修改或新建
          encType: "application/json",
        });
        form.resetFields();
        return true;
      }}
    >
      <ProFormText
        name="name"
        label="部门名称"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormDigit
        name="sortOrder"
        label="排序"
        placeholder="排序"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormSelect
        name="description"
        label="父部门"
        placeholder="不修改无需填写"
        rules={[
          {
            required: false,
            message: "请输入密码",
          },
        ]}
        options={[]}
      />
      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="不修改无需填写"
        rules={[
          {
            required: false,
            message: "请输入密码",
          },
        ]}
      />
    </ModalForm>
  );
}
