// types
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
// components
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-components";

// utils
// import { formatDate } from "~/utils/utils";

import { useFetcherChange } from "~/hooks/useFetcherChange";
import { AdminToolsMailsController } from "~/server/controllers/admin.tools.mail.controller";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-User" }];
};

export const loader: LoaderFunction = AdminToolsMailsController.loader;
export const action: ActionFunction = AdminToolsMailsController.action;

export default function ToolsMailRoute() {
  const fetcher = useFetcherChange();
  return (
    <PageContainer>
      <ProCard title="发送邮件">
        <ProForm
          submitter={{
            searchConfig: {
              submitText: "发送邮件",
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
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProFormText
            label="邮件内容"
            name="content"
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
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProFormText
            label="密码"
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
