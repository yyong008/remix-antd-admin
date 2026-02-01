import { app } from "../app/api/index";
import { createRequestHandler } from "react-router";
declare module "react-router" {
	export interface AppLoadContext extends Record<string, any> {
		cloudflare?: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		const { pathname } = new URL(request.url);
		if (pathname.startsWith("/api")) {
			const result = await app.fetch(request, env, ctx);
			return result;
		}
		return await requestHandler(request);
	},
} satisfies ExportedHandler<Env>;
