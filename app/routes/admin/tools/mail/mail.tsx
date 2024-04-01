// types
import type {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// remix
import { redirect } from "@remix-run/node";
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

import { ADMIN_ROUTE_PREFIX, LANG } from "~/constants";
import {
  destroySession,
  getSession,
  getUserId,
} from "~/services/common/auth.server";
import { sendMail } from "~/services/tools/mail";
import { useFetcherChange } from "~/hooks/useFetcherChange";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-User" },
    { name: "System-User", content: "System-User" },
  ];
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const userId = await getUserId(request);
  const session = await getSession(request.headers.get("Cookie"));
  if (!userId) {
    return redirect(`/${LANG}/${ADMIN_ROUTE_PREFIX}/login`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  const data = await request.json();
  console.log(data);
  const info: any = await sendMail({
    host: data.host,
    port: data.port,
    auth: {
      user: data.user,
      pass: data.pass,
    },
    from: data.from, // 发送者昵称和地址
    to: data.to, // 接收者的邮箱地址
    subject: data.subject, // 邮件主题
    // text: string, //邮件的text
    html: data.html, //也可以用html发送
  });
  if (info.messageId) {
    //
  } else {
    console.log(info);
  }
  return null;
};

// remix:loader
export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  const session = await getSession(request.headers.get("Cookie"));
  if (!userId) {
    return redirect(`/${LANG}/${ADMIN_ROUTE_PREFIX}/login`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return null;
};

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
            debugger;
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
