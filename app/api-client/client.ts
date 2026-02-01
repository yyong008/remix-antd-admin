import { hc, type Client } from "hono/client";

import type { AppType } from "../api";

type CreateClientOptions = {
	baseUrl?: string;
	getToken?: () => string | null | undefined;
};

export type ApiClient = Client<AppType>;

export const createApiClient = (
	options: CreateClientOptions = {},
): ApiClient => {
	const baseUrl = options.baseUrl ?? "/";
	const getToken = options.getToken;

	return hc<AppType>(baseUrl, {
		fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			const token = getToken?.();
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return fetch(input, { ...init, headers });
		},
	});
};
