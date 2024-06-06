import * as clientUtils from "~/utils/client";

import { AccountLogin, MobileLogin } from "~/components/login";
import { Button, ConfigProvider, Tabs } from "antd";
import { Link, useParams, useSubmit } from "@remix-run/react";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import { useActionDataChange, useNProgress } from "~/hooks";
import { useContext, useState } from "react";

import { ActionIcons } from "~/components/userLogin";
import { SettingContext } from "~/context";
import { defaultLang } from "~/config/lang";
import { useTranslation } from "react-i18next";

export function Component() {
  useNProgress();

  const value = useContext(SettingContext);
  const { loading, setLoading } = useActionDataChange();
  const submit = useSubmit();
  const { t } = useTranslation();
  const [type, setType] = useState<string>("account");
  const { lang = defaultLang } = useParams();

  const handleSubmit = async (values: any) => {
    const vals = {
      ...values,
      password: clientUtils.genHashedPassword(values.password),
    };
    submit(vals, { method: "POST", encType: "application/json" });
    setLoading(true);
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
            loading={loading}
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
