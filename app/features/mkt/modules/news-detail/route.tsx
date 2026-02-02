import { NewsContent, NewsHeader } from "./components";

import { useLoaderData } from "react-router";

export function Route() {
	const _data = useLoaderData() as { data?: any } | null;
	const news = _data?.data;
	if (!news) {
		return (
			<div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
				<div className="flex justify-center text-gray-500">
					<div>暂无数据</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
			<NewsHeader news={news} />
			<NewsContent content={news.content} />
		</div>
	);
}
