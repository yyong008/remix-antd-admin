import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormItems } from "./role-form-items";
import { ModalForm } from "~/components/pro-form-kit";
import { useCreateRole } from "~/api-client/queries/system/system-role";
import { roleModalFormProps } from "../role-form-layout";
import { m } from "~/paraglide/messages";
import { useState } from "react";

type CreateRoleModalProps = {
  trigger?: React.ReactNode;
  menu: any[];
  refetch: any;
};

export function CreateRoleModal(props: CreateRoleModalProps) {
  const { trigger, menu, refetch } = props;
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
  const createRole = useCreateRole();
  const onCheck = (checkedKeys: any, _info: any) => {
    setCheckedKeys(checkedKeys);
  };

  return (
    <ModalForm
      title={m.system_role_modal_create()}
      width={720}
      {...roleModalFormProps}
      loading={createRole.isPending}
      trigger={
        trigger ??
        ((
          <Button type="primary" icon={<PlusOutlined />}>
            {m.system_create()}
          </Button>
        ) as any)
      }
      form={form}
      autoFocusFirstInput
      initialValues={{ status: 1 }}
      onOpenChange={(e) => {
        if (e) {
          form.resetFields();
          setCheckedKeys([]);
        }
      }}
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => {},
      }}
      submitTimeout={2000}
      onFinish={async (vals) => {
        await createRole.mutateAsync({ ...vals });
        refetch?.();
        return true;
      }}
    >
      <FormItems menu={menu} checkedKeys={checkedKeys} onCheck={onCheck} />
    </ModalForm>
  );
}
