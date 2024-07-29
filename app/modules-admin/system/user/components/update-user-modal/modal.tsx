import { UpdateUserModalUI } from "./modal-ui";
import { UserModalFormItems } from "./modal-form-items";
import { useUpdateUserByIdMutation } from "@/apis-client/admin/system/user";

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
  const [updateUser] = useUpdateUserByIdMutation();
  return (
    <UpdateUserModalUI
      initValue={record}
      loading={loading}
      reload={reload}
      modalProps={{
        bodyStyle: { maxHeight: "600px", overflowY: "auto" },
      }}
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

        return await updateUser(vals);
      }}
      onOpenChange={(c: any, form: any) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
          roles: record?.UserRole?.map((userRole: any) => userRole.roleId),
          dept: record?.department?.id,
        });
      }}
    >
      <UserModalFormItems depts={depts} roles={roles} />
    </UpdateUserModalUI>
  );
}
