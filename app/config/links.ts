export const getLinks = (lang: string) => [
	{
		title: "更多",
		links: [
			{
				text: "Github",
				to: "https://github.com/yyong008/remix-antd-admin",
				isOut: true,
			},
			{
				text: "组件",
				to: "https://remix-antd-admin-docs.vercel.app/antd/",
				isOut: true,
			},
			{
				text: "业务",
				to: "https://remix-antd-admin-docs.vercel.app/feature/home.html",
				isOut: true,
			},
		],
	},
	{
		title: "资源",
		links: [
			{
				text: "文档",
				to: "https://remix-antd-admin-docs.vercel.app/",
				isOut: true,
			},
			{
				text: "privacy",
				to: `/${lang}/privacy`,
				isOut: false,
			},
		],
	},
	{
		title: "其他",
		links: [
			{
				text: "React Router",
				to: "https://reactrouter.com/home",
				isOut: true,
			},
			{
				text: "Express.js",
				to: `https://expressjs.com/`,
				isOut: true,
			},
			{
				text: "Antd",
				to: `https://ant.design`,
				isOut: true,
			},
			{
				text: "Tailwindcss",
				to: `https://tailwindcss.com/`,
				isOut: true,
			},
			{
				text: "Drizzle",
				to: `https://orm.drizzle.team/`,
				isOut: true,
			},
			{
				text: "Langchain.js",
				to: `https://js.langchain.com/docs/introduction/`,
				isOut: true,
			},
		],
	},
];
