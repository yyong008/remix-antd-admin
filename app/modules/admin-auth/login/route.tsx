import * as clientUtils from "~/utils/client";

import {
  AccountLogin,
  MobileLogin,
} from "~/modules/admin-auth/login/components/login";
import { Button, ConfigProvider, Tabs, message } from "antd";
import { Link, useNavigate, useParams } from "@remix-run/react";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import {
  setLocalStorageRefreshToken,
  setLocalStorageToken,
} from "~/libs/localstorage";
import { useContext, useState } from "react";

import { ActionIcons } from "~/components/user-login";
import { SettingContext } from "~/context";
import { defaultLang } from "~/config/lang";
import { useLoginMutation } from "~/apis-client/auth";
import { useNProgress } from "~/hooks";
import { useTranslation } from "react-i18next";

export function Route() {
  useNProgress();
  const navigate = useNavigate();
  const [login, loginOther] = useLoginMutation();
  const value = useContext(SettingContext);

  const { t } = useTranslation();
  const [type, setType] = useState<string>("account");
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
    <ProConfigProvider dark>
      <ConfigProvider
        theme={{
          token: value.theme,
        }}
      >
        <div className="flex flex-col h-[100vh]">
          <LoginFormPage
            backgroundVideoUrl="https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4"
            className="flex-1"
            containerStyle={{
              backgroundColor: "rgba(0, 0, 0,0.65)",
              backdropFilter: "blur(4px)",
            }}
            activityConfig={{
              style: {
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
                // color: token.colorTextHeading,
                borderRadius: 8,
                backgroundColor: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(4px)",
              },
              title: "去主页",
              // subTitle: "不一样",
              action: (
                <Link to={`/${lang}`}>
                  <Button
                    size="large"
                    style={{
                      borderRadius: 20,
                      // background: token.colorBgElevated,
                      // color: token.colorPrimary,
                      width: 120,
                    }}
                  >
                    去看看
                  </Button>
                </Link>
              ),
            }}
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
              username: "admin",
              password: "123456",
            }}
            actions={[
              <div
                className="flex items-center text-gray-100 mt-[20px]"
                key="login-other"
              >
                <div>{t("login-register.other-login")}</div>
                <ActionIcons key="icons" />
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
              <ProFormCheckbox name="autoLogin">
                {t("login-register.remeber")}
              </ProFormCheckbox>
            </div>
          </LoginFormPage>
          {/* <Footer /> */}
        </div>
      </ConfigProvider>
    </ProConfigProvider>
  );
}
