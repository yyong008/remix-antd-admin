import { ButtonLink } from "~/components/common";
import { DeleteAction } from "../DeleteAction";
import { href, Link } from "react-router";
import { Space } from "antd";

export function createColumns({ refetch, locale }: any) {
	return [
		{
			dataIndex: "title",
			title: "新闻标题",
			renderText(_: any, record: any) {
				return <Link to={{
          pathname: href("/:locale?/news/:id", { locale, id: record.id }),
        }}>{record.title}</Link>;
			},
		},
		{
			dataIndex: "content",
			title: "新闻内容",
			render(_: any, record: any) {
				return <div>{record.content?.slice(0, 20)}</div>;
			},
		},
		{
			dataIndex: "author",
			title: "作者",
		},
		{
			dataIndex: "source",
			title: "新闻来源",
		},
		{
			dataIndex: "newsId",
			title: "新闻分类",
		},
		{
			dataIndex: "viewCount",
			title: "查看次数",
		},
		{
			dataIndex: "op",
			title: "操作",
			render(_: any, record: any) {
				return (
					<Space>
						<ButtonLink
							type="edit"
							to={href("/:locale?/admin/news/edit/:id", { locale, id: record.id })}
						/>
						<DeleteAction refetch={refetch} record={record} title={""} />
					</Space>
				);
			},
		},
	];
}
