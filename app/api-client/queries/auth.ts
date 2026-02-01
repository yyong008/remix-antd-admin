import { useMutation } from "@tanstack/react-query";

import { authClient } from "~/libs/auth/client";
import { simpleStorage } from "~/libs/simpleStorage";

type AuthResult<T> =
	| { data?: T | null; error?: { message?: string } | null }
	| T;

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

function unwrapResult<T>(result: AuthResult<T>, fallbackMessage: string) {
	if (result && typeof result === "object" && "error" in result) {
		if (result.error) {
			throw new Error(result.error.message || fallbackMessage);
		}
		return result.data as T;
	}
	return result as T;
}

export function useLogin() {
	return useMutation({
		mutationFn: async ({ email, password, token }: LoginPayload) => {
			if (!email || !password || !token) {
				throw new Error("请输入账号和密码");
			}
			const result = await authClient.signIn.email({
				email,
				password,
				fetchOptions: {
					headers: {
						"x-captcha-response": token ?? "",
					},
				},
			});
			const data = unwrapResult<LoginResponse>(result, "登录失败");
			if (!data?.token) {
				throw new Error("登录失败，未返回凭证");
			}
			simpleStorage.setToken(data.token);
			return data;
		},
	});
}

export function useEamilSignup() {
	return useMutation({
		mutationFn: async ({
			username,
			email,
			password,
			token,
		}: RegisterPayload) => {
			const resolvedEmail = normalizeAuthEmail(email ?? username);
			if (!username || !resolvedEmail || !password) {
				throw new Error("请完善注册信息");
			}
			const result = await authClient.signUp.email({
				name: username,
				email: resolvedEmail,
				password,
				fetchOptions: {
					headers: {
						"x-captcha-response": token ?? "",
					},
				},
			});
			const data = unwrapResult<RegisterResponse>(result, "注册失败");
			return data;
		},
	});
}

export function useLogout() {
	return useMutation({
		mutationFn: async () => {
			const token = simpleStorage.getToken();
			const result = await authClient.signOut({
				fetchOptions: token
					? { headers: { Authorization: `Bearer ${token}` } }
					: undefined,
			});
			const data = unwrapResult<{ success: boolean }>(result, "退出失败");
			simpleStorage.removeToken();
			return data;
		},
	});
}
