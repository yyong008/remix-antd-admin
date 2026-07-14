import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, message } from "antd";
import { useEffect, useState } from "react";
import { Link, href, useNavigate, useParams } from "react-router";
import { useLogin } from "~/api-client/queries/auth/auth";
import { TurnstileWidget } from "~/components/captcha";
import { isTurnstileEnabled } from "~/config/turnstile";
import { AuthPageCard } from "~/layout/auth/auth-page-card";
import { ProForm, ProFormText } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";
import { useSession } from "~/session/provider";

const SUBMIT_STYLE = { height: 44, borderRadius: 8, fontWeight: 500, boxShadow: "none" } as const;
const ICON_MUTED: React.CSSProperties = { color: "var(--ant-color-text-secondary)" };

export default function LoginRoute() {
  const navigate = useNavigate();
  const { locale } = useParams();
  const loginMutation = useLogin();
  const session = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!session.isLoading && session.user) {
      navigate(href("/:locale?/admin/dashboard", { locale }), { replace: true });
    }
  }, [session.isLoading, session.user, locale, navigate]);

  return (
    <AuthPageCard
      title={m.auth_sign_in_title()}
      subtitle={m.auth_sign_in_subtitle()}
      footer={
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <span>
            {m.auth_no_account()}{" "}
            <Link
              to={locale ? `/${locale}/auth/signup` : "/auth/signup"}
              style={{ fontWeight: 500 }}
            >
              {m.auth_create_account()}
            </Link>
          </span>
          <Link
            to={locale ? `/${locale}` : "/"}
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
          searchConfig: { submitText: m.auth_sign_in_title() },
          submitButtonProps: {
            block: true,
            loading: loginMutation.isPending,
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
            await loginMutation.mutateAsync({
              email: values.email as string,
              password: values.password as string,
              token: token ?? "",
            });
            await session?.refresh?.();
            message.success(m.auth_sign_in_success());
            navigate(href("/:locale?/admin/dashboard", { locale }), { replace: true });
            return true;
          } catch (error) {
            message.error((error as Error)?.message ?? m.auth_sign_in_failed());
            return false;
          }
        }}
      >
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
            autoComplete: "current-password",
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
