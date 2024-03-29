import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import * as _icons from "@ant-design/icons";
import { Button, Form, message } from "antd";
import { useEffect } from "react";

const { PlusOutlined } = _icons;

export default function ModifyDictModal({ trigger, record }: any) {
  const [form] = Form.useForm<{ name: string; company: string }>();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [form, record]);

  return (
    <ModalForm
      title="修改用户"
      trigger={
        trigger ?? (
          <Button type="primary">
            <PlusOutlined />
            修改用户
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log(""),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormUploadButton
        name="file"
        label="上传文件"
        placeholder="请输入名称"
        listType="picture-card"
        action="/upload"
      />
      <ProFormText name="name" label="名字" placeholder="请输入名称" />
      <ProFormText name="nickname" label="昵称" placeholder="请输入名称" />
      <ProFormSelect name="roles" label="角色" placeholder="选择角色" />
      <ProFormText name="nickname" label="邮箱" placeholder="请输入名称" />
      <ProFormText name="lang" label="语言" placeholder="请输入名称" />
      <ProFormText name="theme" label="主题" placeholder="请输入名称" />
      <ProFormSelect
        name="dept"
        label="部门"
        placeholder="Please select favorite colors"
        rules={[
          {
            required: true,
            message: "Please select your favorite colors!",
            type: "array",
          },
        ]}
      />
      <ProFormText name="phone" label="手机号码" placeholder="请输入名称" />
      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          {
            label: "公开",
            value: true,
          },
          {
            label: "隐藏",
            value: false,
          },
        ]}
      />
    </ModalForm>
  );
}
