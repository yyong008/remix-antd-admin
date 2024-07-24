import * as ic from "@ant-design/icons";

import { Button, Form } from "antd";

import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./modal-form-items";

const { EditOutlined } = ic;

export function CreateDeptModal({ trigger, record, fetcher }: any) {
  const [form] = Form.useForm();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={record?.id ? "修改用户" : "创建用户"}
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
          <Button type={record ? "primary" : "link"} icon={<EditOutlined />}>
            {record ? "新建" : ""}
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
        fetcher.submit(vals, {
          method: record.id ? "PUT" : "POST", // 修改或新建
          encType: "application/json",
        });
        form.resetFields();
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
