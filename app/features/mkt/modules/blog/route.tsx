import { BlogItem } from "./components";
import { useLoaderData } from "react-router";

export function Route() {
	const _data = useLoaderData() as { data?: { list?: any[] } } | null;
	const blogs = _data?.data?.list ?? [];
	return (
		<div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">
			<div>
				{blogs?.map((n: any) => {
					return <BlogItem data={n} key={n.id} />;
				})}
			</div>
			<div className="flex justify-center text-gray-500">
				{blogs.length <= 0 ? <div>暂无数据</div> : null}
			</div>
		</div>
	);
}
