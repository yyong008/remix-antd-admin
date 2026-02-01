import { DeleteAction } from "./DeleteAction";
import { Space } from "antd";
import { UpdateDeptModal } from "./UpdateModal";
import { formatDate } from "@/utils/client";

export const createColumns = ({ treeOptions, refetch }: any) => [
	{
		dataIndex: "name",
		title: "部门名称",
		width: 300,
		// ellipsis: true,
		render(_: any, record: any) {
			return <span className="font-bold">{record?.name}</span>;
		},
	},
	{
		dataIndex: "description",
		title: "描述",
		ellipsis: true,
	},
	{
		dataIndex: "parent_department_id",
		title: "父 ID",
	},
	{
		dataIndex: "orderNo",
		title: "序号",
	},
	{
		dataIndex: "createdAt",
		title: "创建时间",
		render(_: any, record: any) {
			return <div>{record.createdAt ? formatDate(record.createdAt) : "-"}</div>;
		},
	},
	{
		dataIndex: "updatedAt",
		title: "更新时间",
		render(_: any, record: any) {
			return <div>{record.updatedAt ? formatDate(record.updatedAt) : "-"}</div>;
		},
	},
	{
		dataIndex: "op",
		title: "操作",
		render(_: any, record: any) {
			return (
				<Space>
					<UpdateDeptModal
						treeOptions={treeOptions}
						record={record}
						key="dept-modal"
						refetch={refetch}
					/>
					<DeleteAction
						title="确定要删除此部门吗?"
						record={record}
						refetch={refetch}
					/>
				</Space>
			);
		},
	},
];
