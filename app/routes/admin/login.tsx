// types
import type {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import type { TLogin } from "~/schema/login.schema";

// react
import { useContext, useState } from "react";

// remix
import { json, redirect } from "@remix-run/node";

// i18n:hooks
import { useTranslation } from "react-i18next";

// components
import { LoginForm, ProFormCheckbox } from "@ant-design/pro-components";
import { Tabs, ConfigProvider } from "antd";
import { ActionIcons } from "~/components/userLogin";
import Footer from "~/components/common/Footer";
import AccountLogin from "~/components/login/AccountLogin";
import MobileLogin from "~/components/login/MobileLogin";

// context
import SettingContext from "~/context/settingContext";

// service
import {
  commitSession,
  destroySession,
  getSession,
} from "~/services/common/auth.server";
import { createLoginLog } from "~/services/system/login-log";
import { findByUserName } from "~/services/login";

// libs
import { getLoginInfo } from "~/utils/ip.util";
import { genHashedPassword } from "~/utils/bcrypt.util.client";
import { comparePassword } from "~/utils/bcrypt.util.server";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";
import { useNProgress } from "~/hooks/useNProgress";

// schema
import { loginLogSchema, LoginSchema } from "~/schema/login.schema";

// config
import { defaultLang } from "~/config/lang";

// constants
import { ADMIN_ROUTE_PREFIX } from "~/constants";

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
  const lang = params?.lang || defaultLang;

  const dataDto = await request.json();
  let validateDataDto: TLogin;

  try {
    validateDataDto = LoginSchema.parse(dataDto);
  } catch (error: any) {
    console.error(error);
    return json({
      code: -1,
      data: {},
      message: error.toString(),
    });
  }

  const user = await findByUserName(validateDataDto.username);

  if (user === null) {
    session.flash("error", "Invalid username/password");
    return json(
      {
        code: 1,
        message: "用户名或密码错误",
        data: {},
      },
      {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      },
    );
  }
  session.set("userId", user.id.toString());

  if (!comparePassword(dataDto.password, user.password)) {
    return json({
      code: -1,
      data: {},
      message: "登录失败,用户名获密码错误!",
    });
  }

  // 写入数据库
  const loginLog = await getLoginInfo(request);
  const validateLoginLog = loginLogSchema.parse({
    ...loginLog,
    name: user.name,
  });

  await createLoginLog({
    ...validateLoginLog,
  });

  const url = "/" + lang + "/" + ADMIN_ROUTE_PREFIX + "/dashboard";

  return redirect(url, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = params.lang || defaultLang;
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/" + lang + "/" + ADMIN_ROUTE_PREFIX + "/dashboard", {
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

export default function LoginPage() {
  useNProgress();
  const value = useContext(SettingContext);
  const fetcher = useFetcherChange();
  const { t } = useTranslation();
  const [type, setType] = useState<string>("account");

  const handleSubmit = async (values: any) => {
    const vals = {
      ...values,
      password: genHashedPassword(values.password),
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
          title={t("login-register.title")}
          subTitle={t("login-register.desc")}
          initialValues={{
            autoLogin: true,
            username: "admin",
            password: "123456",
          }}
          actions={[
            t("login-register.other-login"),
            <ActionIcons key="icons" />,
          ]}
          onFinish={async (values: string) => {
            await handleSubmit(values);
          }}
          submitter={{
            searchConfig: {
              submitText: t("login-register.submit"),
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
                label: t("login-register.account-login"),
              },
              {
                key: "mobile",
                disabled: true,
                label: t("login-register.phone-login"),
              },
            ]}
          />
          {type === "account" && <AccountLogin />}
          {type === "mobile" && <MobileLogin />}
          <div style={{ margin: "10px 0px" }}>
            <ProFormCheckbox noStyle name="autoLogin">
              {t("login-register.remeber")}
            </ProFormCheckbox>
          </div>
        </LoginForm>
        <Footer />
      </div>
    </ConfigProvider>
  );
}
