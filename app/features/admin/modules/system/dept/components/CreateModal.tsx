import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItem";

type CreateDeptModalProps = {
  trigger?: JSX.Element;
  treeOptions: any;
  refetch?: () => void;
};

export function CreateDeptModal(props: CreateDeptModalProps) {
  const { trigger, treeOptions, refetch } = props;
  const [form] = Form.useForm();
  const [createSystemDept] = [(...args: any[]): any => {}]; // todo
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
        trigger ?? (
          <Button type="primary" icon={<EditOutlined />}>
            {"新建"}
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result: any = await createSystemDept(values).unwrap();
        if (result.code !== 0) {
          message.error(result.message ?? "删除失败");
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
