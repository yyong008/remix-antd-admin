import { Button, Form, message } from "antd";
import {
  DrawerForm,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-components";

import { useCreateMailTemplateMutation } from "@/apis-client/admin/tools/mail";

// import { useParams } from "@remix-run/react";

export function MailForm({ data, content, refetch }: any) {
  const [createMailTemplate, other] = useCreateMailTemplateMutation();
  const [form] = Form.useForm();
  // const { lang } = useParams();

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
      <ProFormText
        label="邮件标题"
        name="subject"
        placeholder="请输入邮件主题"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        label="接收邮件人"
        name="to"
        placeholder="输入邮箱接收者"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      {/* <ProFormTextArea
        label="邮件内容"
        name="content"
        placeholder="请输入邮件内容"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      /> */}
      <ProFormText
        label="Host"
        name="host"
        placeholder="请输入邮箱 host 地址，例如 'smtp.163.com'"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormDigit
        label="端口"
        name="port"
        placeholder={"465"}
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        label="用户名"
        name="user"
        placeholder="邮箱地址"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        label="密码"
        placeholder="输入授权码或密码"
        tooltip="授权码可能需要开通 POP3/SMTP/IMAP"
        name="pass"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
    </DrawerForm>
  );
}
