import { Button, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "~/components/pro-form-kit";
import { ModalFormItems } from "./modal-form-item";
import { useCreateDept } from "~/api-client/queries/system/system-dept";
import type { ReactNode } from "react";
import { m } from "~/paraglide/messages";

type CreateDeptModalProps = {
  trigger?: ReactNode;
  treeOptions: any;
  refetch?: () => void;
};

export function CreateDeptModal(props: CreateDeptModalProps) {
  const { trigger, treeOptions, refetch } = props;
  const [form] = Form.useForm();
  const createSystemDept = useCreateDept();
  return (
    <ModalForm
      preserve={false}
      title={m.system_dept_modal_create()}
      trigger={
        (trigger ?? (
          <Button type="primary" icon={<EditOutlined />}>
            {m.system_create()}
          </Button>
        )) as any
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        await createSystemDept.mutateAsync(values);
        refetch?.();
        return true;
      }}
    >
      <ModalFormItems treeOptions={treeOptions} />
    </ModalForm>
  );
}
