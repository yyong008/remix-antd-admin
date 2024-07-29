import { CreateUserModalUI } from "./modal-ui";
import { UserModalFormItems } from "./modal-form-items";
import { useCreateUserMutation } from "@/apis-client/admin/system/user";

type CreateUserModalProps = {
  loading?: boolean;
  reload: any;
  handleCreate?: any;
  depts: any[];
  roles: any[];
};

export function CreateUserModal(props: CreateUserModalProps) {
  const { loading, reload, depts, roles, ...rest } = props;
  const [createUser] = useCreateUserMutation();
  return (
    <CreateUserModalUI
      {...rest}
      modalProps={{
        bodyStyle: { maxHeight: "600px", overflowY: "auto" },
      }}
      loading={loading || false}
      handleCreate={async (values: any, form: any) => {
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
        if (vals.email === "") {
          delete vals.email; // no empty string
        }
        return await createUser(vals);
      }}
    >
      <UserModalFormItems depts={depts} roles={roles} />
    </CreateUserModalUI>
  );
}
