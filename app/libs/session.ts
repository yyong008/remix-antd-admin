// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
// remix
import { createCookieSessionStorage, redirect } from "react-router";

type SessionData = {
	userId: string;
};

type SessionFlashData = {
	error: string;
};

/**
 * session 管理工具函数
 */
export const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: "__session",
			httpOnly: true,
			path: "/",
			sameSite: "lax",
			secrets: [process.env.SESSION_SECRET!],
			secure: process.env.NODE_ENV === "production",
			maxAge: 60_000,
		},
	});

/**
 * 根据 cookie + lang 设置高阶重定向函数
 * @param SetCookie cookie
 * @param lang 语言
 * @returns
 */
const redirectToLoginHigherOrder = (SetCookie: string, lang: string) => () => {
	return redirect(`/${lang}/admin/login`, {
		headers: {
			"Set-Cookie": SetCookie,
		},
	});
};

/**
 * 登出
 * @param request
 * @param lang
 * @returns
 */
export function logout$(request: Request, lang: string) {
	return getSession(request.headers.get("Cookie")).then((session) =>
		destroySession(session).then((SetCookie) =>
			redirectToLoginHigherOrder(SetCookie, lang!),
		),
	);
}

/**
 * 获取用户 userId
 * @param request 请求对象
 * @returns userId
 */
export function getUserId$(request: Request) {
	return getSession(request.headers.get("Cookie")).then((session) => {
		const userId = session.get("userId");
		if (!userId || typeof userId !== "string") {
			return null;
		}
		return +userId;
	});
}

/**
 * 检查授权
 * @param param0
 * @returns
 */
export async function auth$({
	request,
	params,
}: ActionFunctionArgs | LoaderFunctionArgs): Promise<
	[number | null, () => any, number]
> {
	const userId = await getUserId$(request);
	const session = await getSession(request.headers.get("Cookie"));
	const SetCookie = await destroySession(session);
	const redirectToLogin = redirectToLoginHigherOrder(SetCookie, params.locale!);
	const isPresentationMode = Number(process.env.PRESENTATION_MODE ?? 0);
	return [userId, redirectToLogin, isPresentationMode];
}

export class UserSession {
	async getUserId(request: Request) {
		const c = request.headers.get("Cookie");
		const session = await getSession(c);
		const userId = session?.get("userId");

		if (!userId || typeof userId !== "string") {
			return null;
		}
		return +userId;
	}
}

export class Auth {
	async logout({ request, params }: any) {
		const { lang } = params;
		const cookie = request.headers.get("Cookie");
		const session = await getSession(cookie);
		const SetCookie = await destroySession(session);
		return redirect(`/${lang}/admin/login`, {
			headers: {
				"Set-Cookie": SetCookie,
			},
		});
	}
}
