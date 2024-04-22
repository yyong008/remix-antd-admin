import {
  ModalForm,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import * as _icons from "@ant-design/icons";
import { Button, Form } from "antd";

// utils
import * as clientUtils from "~/utils";

const { EditOutlined } = _icons;

export default function CreateUserModal({
  trigger,
  record,
  depts,
  roles,
  fetcher,
}: any) {
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
          roles: record.UserRole.map((role) => role.roleId),
          dept: record?.department?.id,
          file: clientUtils.genFileListByName(record.avatar),
        });
      }}
      trigger={<Button type="link" icon={<EditOutlined />} />}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        let avatar = "";

        if (values.file && values.file.length > 0) {
          const url: string = values.file[0].response.data.name;
          const prefix = "/uploads/";
          avatar = url.startsWith(prefix) ? url : `${prefix}${url}`;
        }
        if (!values.password) {
          delete values.password;
        }
        delete values.file;
        const vals = { ...values, avatar };
        if (record.id) {
          vals.id = record.id;
        }
        if (vals.email === "") {
          delete vals.email; // zod email 可以不传递，但是不能为 ''
        }
        fetcher.submit(vals, {
          method: record.id ? "PUT" : "POST", // 修改或新建
          encType: "application/json",
        });
        form.resetFields();
        return true;
      }}
    >
      <ProFormUploadButton
        name="file"
        label="上传头像"
        placeholder="请输入名称"
        listType="picture-card"
        action="/upload"
        max={1}
      />

      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="用户名"
          placeholder="请输入"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          placeholder="不修改无需填写"
          rules={[
            {
              required: false,
              message: "请输入密码",
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="roles"
          label="角色"
          placeholder="选择角色"
          mode="multiple"
          rules={[
            {
              required: true,
              message: "请选择所属角色",
            },
          ]}
          options={roles.map((role: any) => {
            return { label: role.name, value: role.id };
          })}
        />
        <ProFormTreeSelect
          width="md"
          name="dept"
          label="部门"
          request={async () => {
            return depts;
          }}
          placeholder="请选择所属部门"
          rules={[
            {
              required: true,
              message: "请选择所属部门",
            },
          ]}
          fieldProps={{
            fieldNames: { label: "name", value: "id" },
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name="nickname" label="昵称" placeholder="请输入" />
        <ProFormText name="email" label="邮箱" placeholder="请输入" />
        <ProFormText name="phone" label="手机号" placeholder="请输入" />
        <ProFormSelect
          width="md"
          name="lang"
          label="语言"
          placeholder="请输入名称"
          options={[
            {
              label: "en-US",
              value: "en-US",
            },
            {
              label: "zh-CN",
              value: "zh-CN",
            },
          ]}
        />
        <ProFormSelect
          width="md"
          name="theme"
          label="主题"
          placeholder="请输入名称"
          options={[
            {
              label: "light",
              value: "light",
            },
            {
              label: "dark",
              value: "dark",
            },
            {
              label: "system",
              value: "system",
            },
          ]}
        />
      </ProForm.Group>
      <ProFormTextArea name="remark" label="备注" />
      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          {
            label: "启用",
            value: 1,
          },
          {
            label: "禁用",
            value: 0,
          },
        ]}
      />
    </ModalForm>
  );
}
