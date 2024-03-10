import * as _icons from "@ant-design/icons";
import { ProFormText, ProFormCaptcha } from "@ant-design/pro-components";
import { message } from "antd";
import { t } from "i18next";

const { MobileOutlined, LockOutlined } = _icons;

export default function MobileLogin() {
  return (
    <>
      <ProFormText
        fieldProps={{
          size: "large",
          prefix: <MobileOutlined />,
        }}
        name="mobile"
        placeholder={t("phone-placeholder")!}
        rules={[
          {
            required: true,
            message: t("phone-message")!,
          },
          {
            pattern: /^1\d{10}$/,
            message: t("phone-format-message")!,
          },
        ]}
      />
      <ProFormCaptcha
        fieldProps={{
          size: "large",
          prefix: <LockOutlined />,
        }}
        captchaProps={{
          size: "large",
        }}
        placeholder={t("verification-code")!}
        captchaTextRender={(timing: boolean, count: number) => {
          if (timing) {
            return `${count} ${t("get-verification-code")}`;
          }
          return t("get-verification-code");
        }}
        name="captcha"
        rules={[
          {
            required: true,
            message: t("verification-code")!,
          },
        ]}
        onGetCaptcha={async () => {
          message.success(t("get-captcha")!);
        }}
      />
    </>
  );
}
