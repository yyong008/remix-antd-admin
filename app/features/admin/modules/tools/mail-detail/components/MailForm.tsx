import { Button, Form, message } from "antd";

import { DrawerForm } from "@ant-design/pro-components";
import { FormItems } from "./FormItems";

export function MailForm({ data, content, refetch }: any) {
  const [createMailTemplate, other] = [() => {}, { isLoading: false }] as any;
  const [form] = Form.useForm();

  const onSaveTemplate = async () => {
    if (!content) {
      return message.error("input email content ~");
    }

    const vals = {
      subject: form.getFieldValue("subject"),
      to: form.getFieldValue("to"),
      content,
      host: form.getFieldValue("host"),
      port: form.getFieldValue("port"),
      user: form.getFieldValue("user"),
      pass: form.getFieldValue("pass"),
    };

    const result = await createMailTemplate(vals);
    if (result.data?.code !== 0) {
      message.error(result.data?.message);
      return false;
    }
    message.success(result.data?.message);
    refetch?.();
    form.resetFields();
    return true;
  };
  return (
    <DrawerForm
      loading={other.isLoading}
      form={form}
      initialValues={{ ...data }}
      submitter={{
        render: (props, doms) => {
          return [
            <Button
              type="primary"
              key="rest"
              onClick={() => {
                onSaveTemplate();
              }}
            >
              保存模板
            </Button>,
            <Button
              type="primary"
              key="submit"
              onClick={() => props.form?.submit?.()}
            >
              发送邮件
            </Button>,
          ];
        },
      }}
      onFinish={async (v) => {
        //
      }}
      trigger={<Button type="primary">发布邮件</Button>}
    >
      <FormItems />
    </DrawerForm>
  );
}
