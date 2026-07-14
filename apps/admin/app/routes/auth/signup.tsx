import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, message } from "antd";
import { useState } from "react";
import { Link, href, useNavigate, useParams } from "react-router";
import { useEamilSignup } from "~/api-client/queries/auth/auth";
import { TurnstileWidget } from "~/components/captcha";
import { isTurnstileEnabled } from "~/config/turnstile";
import { AuthPageCard } from "~/layout/auth/auth-page-card";
import { ProForm, ProFormText } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";

const SUBMIT_STYLE = { height: 44, borderRadius: 8, fontWeight: 500, boxShadow: "none" } as const;
const ICON_MUTED: React.CSSProperties = { color: "var(--ant-color-text-secondary)" };

export default function SignupRoute() {
  const navigate = useNavigate();
  const { locale } = useParams();
  const signupMutation = useEamilSignup();
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthPageCard
      title={m.auth_sign_up_title()}
      subtitle={m.auth_sign_up_subtitle()}
      footer={
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <span>
            {m.auth_have_account()}{" "}
            <Link to={href("/:locale?/login", { locale })} style={{ fontWeight: 500 }}>
              {m.auth_sign_in_link()}
            </Link>
          </span>
          <Link
            to={href("/:locale?", { locale })}
            style={{ color: "var(--ant-color-text-secondary)" }}
          >
            {m.auth_back_home()}
          </Link>
        </div>
      }
    >
      <ProForm
        layout="vertical"
        requiredMark={false}
        size="large"
        submitter={{
          searchConfig: { submitText: m.auth_sign_up_title() },
          submitButtonProps: {
            block: true,
            loading: signupMutation.isPending,
            style: SUBMIT_STYLE,
          },
          resetButtonProps: false,
        }}
        onFinish={async (values) => {
          if (isTurnstileEnabled() && !token) {
            message.error(m.auth_turnstile_required());
            return false;
          }
          try {
            await signupMutation.mutateAsync({
              username: values.username as string,
              email: values.email as string,
              password: values.password as string,
              token: token ?? "",
            });
            message.success(m.auth_sign_up_success());
            navigate(href("/:locale?/login", { locale }), { replace: true });
            return true;
          } catch (error) {
            message.error((error as Error)?.message ?? m.auth_sign_up_failed());
            return false;
          }
        }}
      >
        <ProFormText
          name="username"
          label={m.auth_username_label()}
          placeholder={m.auth_username_placeholder()}
          fieldProps={{
            prefix: <UserOutlined style={ICON_MUTED} />,
            autoComplete: "username",
            allowClear: true,
          }}
          rules={[
            { required: true, message: m.auth_username_required() },
            { min: 2, message: m.auth_username_min() },
            { max: 64, message: m.auth_username_max() },
          ]}
        />
        <ProFormText
          name="email"
          label={m.auth_email_label()}
          placeholder="you@company.com"
          fieldProps={{
            prefix: <MailOutlined style={ICON_MUTED} />,
            autoComplete: "email",
            allowClear: true,
          }}
          rules={[
            { required: true, message: m.auth_email_required() },
            { type: "email", message: m.auth_email_invalid() },
          ]}
        />
        <ProFormText.Password
          name="password"
          label={m.auth_password_label()}
          placeholder={m.auth_password_placeholder()}
          fieldProps={{
            prefix: <LockOutlined style={ICON_MUTED} />,
            autoComplete: "new-password",
          }}
          rules={[
            { required: true, message: m.auth_password_required() },
            { min: 6, message: m.auth_password_min() },
          ]}
        />
        <Form.Item style={{ marginBottom: 8 }}>
          <TurnstileWidget handleSuccess={setToken} />
        </Form.Item>
      </ProForm>
    </AuthPageCard>
  );
}
