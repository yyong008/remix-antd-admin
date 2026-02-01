import { DeleteAction } from "./DeleteAction";
import { OneToOneOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { StatusType } from "@/components/common";
import { UpdateDictItemModal } from "./UpdateDictItemModal";
import { formatDate } from "@/utils/client";

export const createColumns = ({ refetch }: any) => [
	{
		dataIndex: "key",
		title: "字典键",
		render(_: any, record: any) {
			return (
				<div className="flex font-bold gap-4">
					<OneToOneOutlined />
					<span>{record.key}</span>
				</div>
			);
		},
	},
	{
		dataIndex: "value",
		title: "字典值",
	},
	{
		dataIndex: "remark",
		title: "标记",
	},
	{
		dataIndex: "status",
		title: "状态",
		renderText(_: any, record: any) {
			return <StatusType status={record.status} />;
		},
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
					<UpdateDictItemModal
						key="update-dict-item-modal"
						record={record}
						refetch={refetch}
					/>
					<DeleteAction
						title="确定要删除字典？"
						refetch={refetch}
						record={record}
					/>
				</Space>
			);
		},
	},
];
