import { Space, Tag } from "antd";

import { Link } from "react-router";
import { LinkSvg } from "./LinkSvg";
import { UpdateLinkModal } from "./UpdateLinkModal";

export function createColumns({ refetch }: any) {
	return [
		{
			dataIndex: "name",
			title: "链接名",
		},
		{
			dataIndex: "url",
			title: "链接地址",
			renderText(_: any, record: any) {
				return (
					<Link to={record.url} target="_blank">
						<Tag className="inline-flex" color="cyan">
							{record.url}
							<LinkSvg className="border-yellow-200 w-[16px]" />
						</Tag>
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
						<UpdateLinkModal
							refetch={refetch}
							record={record}
							key="modify-link-modal"
						/>
					</Space>
				);
			},
		},
	];
}
