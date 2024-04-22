// types
import type {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { type TRegister } from "~/schema/login.schema";
// react
import { useContext, useState } from "react";

// remix
import { useNavigate, useParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

// hooks
import { useTranslation } from "react-i18next";
import { useNProgress, useFetcherChange } from "~/hooks";

// components
import { LoginForm, ProFormCheckbox } from "@ant-design/pro-components";
import { Tabs, ConfigProvider } from "antd";
import { ActionIcons } from "~/components/userLogin";
import { Footer } from "~/components/common";
import { AccountLogin, MobileLogin } from "~/components/login";

// context
import SettingContext from "~/context/settingContext";

// service
import { findByUserName } from "~/server/services/login";
import { createUserFromRegister } from "~/server/services/register";
import { createLoginLog } from "~/server/services/system/login-log";

// libs
import { getLoginInfo, hashPassword } from "~/server/utils";
import * as clientUtils from "~/utils";

// auth
import {
  commitSession,
  destroySession,
  getSession,
} from "~/server/services/common/session";

// schema
import { RegisterSchema, loginLogSchema } from "~/schema/login.schema";

// config
import { defaultLang } from "~/config/lang";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "用户登录",
    },
  ];
};

// remix:action
export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const method = request.method;
  const { lang } = params || "zh-CN";

  if (method === "POST") {
    // 获取 dto
    const dataDto = await request.json();
    let validateDataDto: TRegister;
    // 校验 dto
    try {
      validateDataDto = RegisterSchema.parse(dataDto);
    } catch (error: any) {
      console.error(error);
      return json({
        code: -1,
        data: {},
        message: error.toString(),
      });
    }
    // 查找是否已经存在
    const user = await findByUserName(validateDataDto.username);
    if (user) {
      return json({
        code: -1,
        data: {},
        message: "用户已存在",
      });
    }

    // 创建普通权限用户
    const newUser = await createUserFromRegister({
      username: validateDataDto.username,
      password: hashPassword(validateDataDto.password),
    });
    // userId 写入 session
    session.set("userId", newUser.id);
    // 登录：写入日志流程
    const loginLog = await getLoginInfo(request);
    const validateLoginLog = loginLogSchema.parse({
      ...loginLog,
      name: newUser.name,
    });

    // 写入日志
    await createLoginLog({
      ...validateLoginLog,
    });

    return redirect("/" + lang + "/admin/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = params.lang || defaultLang;
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/" + lang + "/admin/dashboard", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function RegisterPage() {
  useNProgress();
  const navigate = useNavigate();
  const { lang } = useParams();
  const value = useContext(SettingContext);
  const fetcher = useFetcherChange();
  const { t } = useTranslation();
  const [type, setType] = useState<string>("account");

  if (!lang) {
    navigate(-1);
    return null;
  }

  const handleSubmit = async (values: any) => {
    const vals = {
      ...values,
      password: clientUtils.genHashedPassword(values.password),
    };
    fetcher.submit(vals, { method: "POST", encType: "application/json" });
  };

  return (
    <ConfigProvider
      theme={{
        token: value.theme,
      }}
    >
      <div className="flex flex-col h-[100vh] justify-center">
        <LoginForm
          className="flex-1"
          loading={
            fetcher.state === "loading" || fetcher.state === "submitting"
          }
          logo={
            <img alt="logo" src="/logo.png" style={{ borderRadius: "10px" }} />
          }
          title={t("title")}
          subTitle={t("desc")}
          initialValues={{}}
          actions={[t("other-login"), <ActionIcons key="icons" />]}
          onFinish={async (values: string) => {
            await handleSubmit(values);
          }}
          submitter={{
            searchConfig: {
              submitText: t("submit"),
            },
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: "account",
                label: t("account-password-login"),
              },
              {
                key: "mobile",
                disabled: true,
                label: t("phone-number-login"),
              },
            ]}
          />
          {type === "account" && <AccountLogin isRegister />}
          {type === "mobile" && <MobileLogin />}
          <div style={{ margin: "10px 0px" }}>
            <ProFormCheckbox noStyle name="autoLogin">
              {t("remeber")}
            </ProFormCheckbox>
          </div>
        </LoginForm>
        <Footer />
      </div>
    </ConfigProvider>
  );
}
