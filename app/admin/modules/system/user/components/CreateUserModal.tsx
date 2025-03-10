import * as clientUtils from "@/utils/client";

import { CreateUserModalUI } from "./CreateUserModalUI";
import { UserModalFormItems } from "./ModalFormItems";
import { createUser } from "~/admin/apis/admin/system/user";

type CreateUserModalProps = {
  loading?: boolean;
  reload: any;
  handleCreate?: any;
  depts: any[];
  roles: any[];
};

export function CreateUserModal(props: CreateUserModalProps) {
  const { loading, reload, depts, roles, ...rest } = props;
  return (
    <CreateUserModalUI
      {...rest}
      loading={loading || false}
      handleCreate={async (values: any) => {
        let avatar = "";

        if (values.file && values.file.length > 0) {
          const url: string = values.file[0].response.data.name;
          const prefix = "/uploads/";
          avatar = url.startsWith(prefix) ? url : `${prefix}${url}`;
        }
        if (!values.password) {
          delete values.password;
        } else {
          values.password = clientUtils.genHashedPassword(values.password);
        }
        delete values.file;
        const vals = { ...values, avatar };
        if (vals.email === "") {
          delete vals.email; // no empty string
        }
        await createUser(vals);
        reload?.();
        return true;
      }}
    >
      <UserModalFormItems depts={depts} roles={roles} showPassword={true} />
    </CreateUserModalUI>
  );
}
