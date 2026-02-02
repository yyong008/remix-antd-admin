import { BlogContent, BlogHeader } from "./components";

import { Layout } from "./layout";
import type { loader } from "./loader";
import { useLoaderData } from "react-router";

export function Route() {
	const _data = useLoaderData<typeof loader>() as { data?: any } | null;
	const blog = _data?.data;
	if (!blog) {
		return (
			<Layout>
				<div className="flex justify-center text-gray-500">
					<div>暂无数据</div>
				</div>
			</Layout>
		);
	}
	return (
		<Layout>
			<BlogHeader blog={blog} />
			<BlogContent content={blog.content} />
		</Layout>
	);
}
