import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "~/components/pro-form-kit";
import { ModalFormItems } from "./ModalFormItem";
import { useCreateDept } from "~/api-client/queries/system-dept";

import type { ReactNode } from "react";

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
      key={Date.now()}
      preserve={false}
      title="创建部门"
      onOpenChange={(c) => {
        if (!c) {
          return;
        }
      }}
      trigger={
        (trigger ?? (
          <Button type="primary" icon={<EditOutlined />}>
            {"新建"}
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
        const result: any = await createSystemDept.mutateAsync(values);
        if (result?.code !== 0) {
          message.error(result?.message ?? "创建失败");
          return false;
        }

        message.success("创建成功");
        refetch?.();
        return true;
      }}
    >
      <ModalFormItems treeOptions={treeOptions} />
    </ModalForm>
  );
}
