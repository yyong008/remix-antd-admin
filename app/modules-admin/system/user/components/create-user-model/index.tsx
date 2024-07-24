import * as clientUtils from "~/utils/client";
import * as ic from "@ant-design/icons";

import { Button, Form } from "antd";

import { ModalForm } from "@ant-design/pro-components";
import { UserModalForm } from "./user-modal-form";

const { EditOutlined } = ic;

export function CreateUserModal({
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
          roles: record.UserRole.map((role: any) => role.roleId),
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
      <UserModalForm depts={depts} />
    </ModalForm>
  );
}
