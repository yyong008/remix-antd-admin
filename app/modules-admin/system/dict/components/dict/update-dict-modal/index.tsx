import * as ic from "@ant-design/icons";

import { Button, Form, message } from "antd";

import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./modal-form-items";
import { useEffect } from "react";

const { PlusOutlined } = ic;

export function UpdateDictModal({ trigger, record }: any) {
  const [form] = Form.useForm<{ name: string; company: string }>();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [form, record]);

  return (
    <ModalForm
      title="修改用户"
      trigger={
        trigger ?? (
          <Button type="primary">
            <PlusOutlined />
            修改用户
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log(""),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        message.success("提交成功");
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
