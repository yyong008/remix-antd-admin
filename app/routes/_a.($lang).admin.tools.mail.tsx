// types
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import {
  Link,
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from "@remix-run/react";
// components
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { useFetcherChange } from "~/hooks";
import { AdminToolsMailsController } from "~/server/controllers/tools/admin.tools.mail.controller";
import { Button, Form } from "antd";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-User" }];
};

export const loader: LoaderFunction = AdminToolsMailsController.loader;
export const action: ActionFunction = AdminToolsMailsController.action;

export default function ToolsMailRoute() {
  const [form] = Form.useForm();
  const fetcher = useFetcherChange();
  const { lang } = useParams();

  const onSaveTemplate = () => {
    const vals = {
      subject: form.getFieldValue("subject"),
      to: form.getFieldValue("to"),
      content: form.getFieldValue("content"),
      host: form.getFieldValue("host"),
      port: form.getFieldValue("port"),
      user: form.getFieldValue("user"),
      pass: form.getFieldValue("pass"),
    };
    fetcher.submit(vals, {
      encType: "application/json",
      method: "POST",
      action: `/${lang!}/admin/tools/mail/list`,
    });
  };
  return (
    <PageContainer>
      <ProCard
        title="发送邮件"
        tooltip="默认支持的邮箱服务包括：”QQ”、”163”、”126”、”iCloud”、”Hotmail”、”Yahoo”等"
        extra={
          <Link to={`/${lang}/admin/tools/mail/list`}>
            <Button type="primary">查看所有模板</Button>
          </Link>
        }
      >
        <ProForm
          form={form}
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
            fetcher.submit(v, {
              method: "POST", // 修改或新建
              encType: "application/json",
            });
          }}
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
          <ProFormTextArea
            label="邮件内容"
            name="content"
            placeholder="请输入邮件内容"
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
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
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
