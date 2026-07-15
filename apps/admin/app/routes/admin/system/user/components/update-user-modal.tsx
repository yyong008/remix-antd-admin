import { Alert, Button, Flex, Form, message } from "antd";
import { EditThemeIcon } from "~/components/common/write-theme-icons";
import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "~/components/pro-form-kit";
import { useUpdateUser } from "~/api-client/queries/system/system-user";
import { genFileListByName } from "~/utils/server/utils";
import { optionsLocale, optionsStatus, optionsTheme } from "~/constants/options";
import UploadWithCrop from "~/components/common/UploadWithCrop";
import { m } from "~/paraglide/messages";

type UpdateUserModalProps = {
  reload: any;
  depts: any[];
  roles: any[];
  record: any;
};

function FormItems({ depts, roles }: { depts: any[]; roles: any[] }) {
  return (
    <>
      <UploadWithCrop label={m.system_user_field_avatar()} placeholder="选择图片" />
      <ProFormText
        name="name"
        label={m.system_user_field_username()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText.Password
        name="password"
        label={m.system_user_field_password()}
        placeholder={m.system_user_field_password_placeholder()}
      />
      <ProFormSelect
        name="roles"
        label={m.system_user_field_role()}
        mode="multiple"
        fieldProps={{ maxCount: 1 }}
        placeholder={m.tools_placeholder_select()}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
        options={roles?.map((role: any) => ({ label: role.name, value: role.id }))}
      />
      <ProFormTreeSelect
        name="departmentId"
        label={m.system_user_field_department()}
        request={async () => depts}
        placeholder={m.tools_placeholder_select()}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
        fieldProps={{ fieldNames: { label: "name", value: "id" } }}
      />
      <ProFormText
        name="nickname"
        label={m.system_user_field_nickname()}
        placeholder={m.tools_placeholder_enter()}
      />
      <ProFormText
        name="email"
        label={m.system_user_field_email()}
        placeholder={m.tools_placeholder_enter()}
      />
      <ProFormText
        name="phone"
        label={m.system_user_field_phone()}
        placeholder={m.tools_placeholder_enter()}
      />
      <ProFormSelect
        name="locale"
        label={m.system_user_column_lang()}
        placeholder={m.tools_placeholder_enter()}
        options={optionsLocale}
        fieldProps={{ defaultValue: "en" }}
      />
      <ProFormSelect
        name="theme"
        label={m.system_user_column_theme()}
        placeholder={m.tools_placeholder_enter()}
        options={optionsTheme}
        fieldProps={{ defaultValue: "light" }}
      />
      <ProFormTextArea name="remark" label={m.system_user_column_remark()} />
      <ProFormRadio.Group name="status" label={m.system_status()} options={optionsStatus} />
    </>
  );
}

export function UpdateUserModal(props: UpdateUserModalProps) {
  const { reload, depts, roles, record } = props;
  const [form] = Form.useForm();
  const updateUserMutation = useUpdateUser();

  return (
    <ModalForm
      preserve={false}
      title={m.system_user_modal_update()}
      onOpenChange={(c, form: any) => {
        if (!c || !record.id) return;
        form.setFieldsValue({
          ...record,
          file: genFileListByName(record.avatar),
          departmentId: record?.department?.id,
          roles: record?.UserRole?.map((userRole: any) => userRole.roleId),
          dept: record?.department?.id,
        });
      }}
      trigger={<Button type="link" icon={<EditThemeIcon />} />}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
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
        if (!values.password) delete values.password;
        delete values.file;
        const vals = { ...values, avatar, id: record.id };
        if (vals.email === "") delete vals.email;
        await updateUserMutation.mutateAsync(vals);
        reload?.();
        form.resetFields();
        message.success(m.system_user_toast_updated());
        return true;
      }}
    >
      <Flex vertical gap={12}>
        <Alert title={m.system_user_update_no_password()} type="warning" banner />
        <FormItems depts={depts} roles={roles} />
      </Flex>
    </ModalForm>
  );
}
