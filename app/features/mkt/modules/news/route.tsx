import { NewsItem } from "./components";
import { useLoaderData } from "react-router";

export function Route() {
	const _data = useLoaderData() as { data?: { list?: any[] } } | null;
	const news = _data?.data?.list ?? [];
	return (
		<div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
			<div>
				{news?.map((n: any) => {
					return <NewsItem data={n} key={n.id} />;
				})}
			</div>
			<div className="flex justify-center text-gray-500">
				{news.length <= 0 ? <div>暂无数据</div> : null}
			</div>
		</div>
	);
}
