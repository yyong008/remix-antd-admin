import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItem";
import { systemDeptApi } from "@/apis-client/admin/system/dept/index";

export function UpdateDeptModal({ trigger, record, treeOptions }: any) {
  const [form] = Form.useForm();
  const [updateDept] = systemDeptApi.useUpdatesystemDeptByIdMutation();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="修改部门"
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={
        trigger ?? (
          <Button type={"primary"} icon={<EditOutlined />}>
            更新
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
        const vals = { ...values };
        if (record.id) {
          vals.id = record.id;
        }
        const result: any = await updateDept(vals);
        if (result.code !== 0) {
          message.error(result.message ?? "删除失败");
          return false;
        }

        message.success("删除成功");
        form.resetFields();
        return true;
      }}
    >
      <ModalFormItems treeOptions={treeOptions} />
    </ModalForm>
  );
}
