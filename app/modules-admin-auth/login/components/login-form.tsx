import * as clientUtils from "@/utils/client";

import { ConfigProvider, message } from "antd";
import { Link, useNavigate, useParams } from "@remix-run/react";
import { LoginForm, ProConfigProvider } from "@ant-design/pro-components";
import {
  setLocalStorageRefreshToken,
  setLocalStorageToken,
} from "@/libs/localstorage";

import { ActionIcons } from "@/components/user-login";
import { SettingContext } from "@/context";
import { defaultLang } from "@/config/lang";
import { useContext } from "react";
import { useLoginMutation } from "@/apis-client/auth";
import { useNProgress } from "@/hooks";
import { useTranslation } from "react-i18next";

export function LoginFormWrap({ children }: any) {
  useNProgress();
  const navigate = useNavigate();
  const [login, loginOther] = useLoginMutation();
  const value = useContext(SettingContext);

  const { t } = useTranslation();
  const { lang = defaultLang } = useParams();

  const handleSubmit = async (values: any) => {
    const data = {
      ...values,
      password: clientUtils.genHashedPassword(values.password),
    };
    const result: any = await login(data);
    if (result.data.code === 0 && result.data.data.token?.length > 0) {
      setLocalStorageToken(result.data.data.token);
      setLocalStorageRefreshToken(result.data.data.refresh_token);
      message.success(result.data.message);
      navigate(`/${lang}/admin/dashboard`, { replace: true });
    } else {
      message.error(result.data.message);
    }
    return true;
  };

  return (
    <ProConfigProvider>
      <ConfigProvider
        theme={{
          token: value.theme,
        }}
      >
        <div className="flex flex-col h-[100vh]  ">
          <LoginForm
            className="flex-1 text-slate-950"
            loading={loginOther.isLoading}
            logo={
              <img
                alt="logo"
                src="/logo.png"
                style={{ borderRadius: "10px" }}
              />
            }
            title={t("login-register.title")}
            subTitle={t("login-register.desc")}
            initialValues={{
              autoLogin: true,
              username: "super admin",
              password: "123456",
            }}
            actions={[
              <div
                className="flex justify-between items-centermt-[20px] text-black"
                key="login-other"
              >
                <data className="flex items-center">
                  <div>{t("login-register.other-login")}</div>
                  <ActionIcons key="icons" />
                </data>

                <div className="flex justify-between items-center">
                  <Link to={`/${lang}/admin/register`}>register</Link>
                </div>
              </div>,
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
            {children}
          </LoginForm>
        </div>
      </ConfigProvider>
    </ProConfigProvider>
  );
}
