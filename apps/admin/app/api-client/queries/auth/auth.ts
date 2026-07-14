import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { isTurnstileEnabled } from "~/config/turnstile";
import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";
import { useSession } from "~/session/provider";

type LoginPayload = {
  email: string;
  password: string;
  token: string;
};

type RegisterPayload = {
  username: string;
  email?: string;
  password: string;
  token: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type RegisterResponse = {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

const AUTH_EMAIL_DOMAIN = "local";

function normalizeAuthEmail(input: string) {
  const value = input.trim().toLowerCase();
  if (!value) return value;
  return value.includes("@") ? value : `${value}@${AUTH_EMAIL_DOMAIN}`;
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password, token }: LoginPayload) => {
      const resolvedEmail = normalizeAuthEmail(email);
      if (!resolvedEmail || !password) {
        throw new Error("请输入账号和密码");
      }
      if (isTurnstileEnabled() && !token) {
        throw new Error("请完成人机验证");
      }
      const res = await (getApiClient() as any).api.auth.login.$post({
        json: {
          email: resolvedEmail,
          password,
          token,
        },
      });
      const result = await parseRsj<LoginResponse>(res);
      if (!result?.token) {
        throw new Error("登录失败，未返回凭证");
      }
      return result;
    },
  });
}

export function useEamilSignup() {
  const _navigate = useNavigate();
  const { locale: _locale } = useParams();
  return useMutation({
    mutationFn: async ({ username, email, password, token }: RegisterPayload) => {
      const resolvedEmail = normalizeAuthEmail(email ?? username);
      if (!username || !resolvedEmail || !password) {
        throw new Error("请完善注册信息");
      }
      const res = await (getApiClient() as any).api.auth.register.$post({
        json: {
          username,
          email: resolvedEmail,
          password,
          token,
        },
      });
      const result = await parseRsj<RegisterResponse>(res);
      return result;
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { locale } = useParams();
  const session = useSession();
  return useMutation({
    mutationFn: async () => {
      const res = await (getApiClient() as any).api.auth.logout.$post();
      const result = await parseRsj<{ success: boolean }>(res);
      if (result?.success) {
        session?.refresh();
        navigate(`/${locale ? `${locale}/` : ""}auth/login`, { replace: true });
      }
      return result;
    },
  });
}
