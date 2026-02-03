import { Space, Tag } from "antd";

import { DeleteAction } from "./DeleteAction";
import { href, Link } from "react-router";
import { UpdateNewsCategoryModal } from "./UpdateNewsCategoryModal";

export function createColumns({ refetch, locale }: any) {
	return [
		{
			dataIndex: "name",
			title: "新闻分类名",
			render(_: any, record: any) {
				return (
					<Link to={{
            pathname: href("/:locale?/admin/news/category/:id", { locale, id: record.id }),
          }}>
						<Tag color="blue">{record.name}</Tag>
					</Link>
				);
			},
		},
		{
			dataIndex: "description",
			title: "描述",
		},
		{
			dataIndex: "op",
			title: "操作",
			render(_: any, record: any) {
				return (
					<Space>
						<UpdateNewsCategoryModal
							key="news-category-modal-modify"
							record={record}
							refetch={refetch}
						/>
						<DeleteAction record={record} refetch={refetch} title="删除" />
					</Space>
				);
			},
		},
	];
}
