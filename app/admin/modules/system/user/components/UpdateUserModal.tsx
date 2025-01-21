import { UpdateUserModalUI } from "./UpdateUserModalUI";
import { UserModalFormItems } from "./ModalFormItems";
import { genFileListByName } from "@/utils/server/utils";
import { updateUserById } from "@/admin/apis/admin/system/user";

type UpdateUserModalProps = {
  loading: boolean;
  reload: any;
  handleUpdate?: any;
  depts: any[];
  roles: any[];
  record: any;
};

export function UpdateUserModal(props: UpdateUserModalProps) {
  const { loading, reload, depts, roles, record } = props;
  return (
    <UpdateUserModalUI
      initValue={record}
      loading={loading}
      reload={reload}
      handleUpdate={async (values: any, form: any) => {
        let avatar = "";

        if (values.file && values.file.length > 0) {
          const url: string = values.file[0].response.data.name;
          const prefix = "/uploads/";
          avatar = url.startsWith(prefix) ? url : `${prefix}${url}`;
        }

        if (!values.password) delete values.password;

        delete values.file;
        const vals = { ...values, avatar, id: record.id };
        if (vals.email === "") delete vals.email; // no empty string

        const result = await updateUserById(vals);
        reload?.();
        return result;
      }}
      onOpenChange={(c: any, form: any) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
          file: genFileListByName(record.avatar),
          departmentId: record?.department?.id,
          roles: record?.UserRole?.map((userRole: any) => userRole.roleId),
          dept: record?.department?.id,
        });
      }}
    >
      <UserModalFormItems depts={depts} roles={roles} showPassword={false} />
    </UpdateUserModalUI>
  );
}
