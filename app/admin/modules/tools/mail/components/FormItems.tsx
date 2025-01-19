import { ProFormDigit, ProFormText } from "@ant-design/pro-components";

export function FormItems() {
  return (
    <>
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
    </>
  );
}
