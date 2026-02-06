import { ButtonLink } from "@/components/common";
import { DeleteAction } from "./DeleteAction";
import { Space } from "antd";
import { href } from "react-router";

export const createColumns = ({ locale, refetch }: any) => [
	{
		dataIndex: "name",
		title: "模板名称",
		ellipsis: true,
	},
	{
		dataIndex: "subject",
		title: "邮件标题",
		ellipsis: true,
	},
	{
		dataIndex: "to",
		title: "接收邮件人",
		ellipsis: true,
	},
	{
		dataIndex: "content",
		title: "邮件内容",
		ellipsis: true,
	},
	{
		dataIndex: "op",
		title: "操作",
		fixed: "right",
		ellipsis: true,
		render(_: any, record: any) {
			return (
				<Space>
					<ButtonLink
						key="create-mail"
						to={href(`/:locale?/admin/tools/mail/:id`, { locale, id: record.id })}
						type={"edit"}
					/>
					<DeleteAction record={record} title={"用户"} refetch={refetch} />
				</Space>
			);
		},
	},
];
