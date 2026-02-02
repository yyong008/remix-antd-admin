import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from "@react-router/dev/routes";

const cmsRoutes = [
	...prefix(":locale?/", [
		route("docs/*", "routes/cms/docs.$.tsx"),
		route("/privacy-policy", "./routes/cms/privacy-policy.tsx"),
		route("/terms-of-service", "./routes/cms/terms-of-service.tsx"),
		route("/cookie-policy", "./routes/cms/cookie-policy.tsx"),
		route("/license", "./routes/cms/license.tsx"),
	]),
];

export const clientRoutes = [
	layout("features/mkt/layout/index.tsx", [
		...prefix(":locale?/", [
			index("features/mkt/modules/index/index.tsx"),
			route("about", "features/mkt/modules/about/index.tsx"),
			...prefix("blog", [
				index("features/mkt/modules/blog/index.tsx"),
				route(":id", "features/mkt/modules/blog-detail/index.tsx"),
			]),
			...prefix("news", [
				index("features/mkt/modules/news/index.tsx"),
				route(":id", "features/mkt/modules/news-detail/index.tsx"),
			]),
			route("privacy", "features/mkt/modules/privacy/index.tsx"),
		]),
		...cmsRoutes,
	]),
	// any
	route("*", "features/mkt/modules/any/index.tsx"),
];

export const authRoutes = [
	...prefix(":locale?/auth", [
		route("login", "features/auth/modules/login/index.tsx"),
		route("signup", "features/auth/modules/signup/index.tsx"),
	]),
];

export const adminRoutes = [
	...prefix(":locale?/admin", [
		layout("features/admin/layout/index.tsx", [
			...prefix("dashboard", [
				index("features/admin/modules/dashboard/index.tsx"),
			]),
			...prefix("ai", [
				route(
					"simplechat",
					"features/admin/modules/ai/simplechat/index.tsx",
				),
			]),
			...prefix("news", [
				route("edit", "features/admin/modules/news/edit/index.tsx"),
				route(
					"edit/:id",
					"features/admin/modules/news/edit-detail/index.tsx",
				),
				route("category", "features/admin/modules/news/category/index.tsx"),
				route("category/:id", "features/admin/modules/news/list/index.tsx"),
				route("result", "features/admin/modules/news/result/index.tsx"),
			]),
			...prefix("blog", [
				index("features/admin/modules/blog/index/index.tsx"),
				route("category", "features/admin/modules/blog/category/index.tsx"),
				route("tag", "features/admin/modules/blog/tag/index.tsx"),
				route("edit", "features/admin/modules/blog/create/index.tsx"),
				route("edit/:id", "features/admin/modules/blog/edit/index.tsx"),
				route("result", "features/admin/modules/blog/result/index.tsx"),
			]),
			...prefix("profile", [
				route("account", "features/admin/modules/profile/account/index.tsx"),
				...prefix("link", [
					...prefix("category", [
						index(
							"features/admin/modules/profile/link/category/index.tsx",
						),
						route(
							":id",
							"features/admin/modules/profile/link/category-detail/index.tsx",
						),
					]),
				]),
			]),
			...prefix("system", [
				route("config", "features/admin/modules/system/config/index.tsx"),
				route("dept", "features/admin/modules/system/dept/index.tsx"),
				route("dict", "features/admin/modules/system/dict/index.tsx"),
				route(
					"dict-item/:id",
					"features/admin/modules/system/dict-item/index.tsx",
				),
				route("menu", "features/admin/modules/system/menu/index.tsx"),
				...prefix("monitor", [
					route(
						"login-log",
						"features/admin/modules/system/monitor/login-log/index.tsx",
					),
					route(
						"serve",
						"features/admin/modules/system/monitor/serve/index.tsx",
					),
					route(
						"moperate",
						"features/admin/modules/system/monitor/operate/index.tsx",
					),
				]),

				route("role", "features/admin/modules/system/role/index.tsx"),
				route("user", "features/admin/modules/system/user/index.tsx"),
			]),
			...prefix("tools", [
				...prefix("mail", [
					index("features/admin/modules/tools/mail/index.tsx"),
					route("list", "features/admin/modules/tools/mail-list/index.tsx"),
					route(
						":id",
						"features/admin/modules/tools/mail-detail/index.tsx",
					),
				]),

				route(
					"storage",
					"features/admin/modules/tools/storage/index.tsx",
				),
			]),
			route("about", "features/admin/modules/about/index.tsx"),
		]),
	]),
];

export default [
	...clientRoutes,
	...authRoutes,
	...adminRoutes,
] satisfies RouteConfig;
