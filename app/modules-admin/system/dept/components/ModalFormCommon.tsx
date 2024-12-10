import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItem";
import { systemDeptApi } from "@/apis-client/admin/system/dept/index";

export function ModalFormCommon({ trigger, treeOptions }: any) {
  const [form] = Form.useForm();
  const [createSystemDept] = systemDeptApi.useCreatesystemDeptMutation();
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
        }

        message.success("删除成功");
        return true;
      }}
    >
      <ModalFormItems treeOptions={treeOptions} />
    </ModalForm>
  );
}
