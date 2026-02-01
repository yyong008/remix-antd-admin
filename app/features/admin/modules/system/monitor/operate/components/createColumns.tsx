import { Tag } from "antd";
import { formatDate } from "~/utils/client";

export const createColumns = () => [
	{
		dataIndex: "userId",
		title: "用户名",
		ellipsis: true,
		render(_: any, record: any) {
			if (record.userId === 0) {
				return <div>未登录</div>;
			}
			return <div>{record.userId}</div>;
		},
	},
	{
		dataIndex: "username",
		title: "用户名",
		ellipsis: true,
	},
	{
		dataIndex: "ipAddress",
		title: "ip",
		ellipsis: true,
	},
	{
		dataIndex: "path",
		title: "访问路径",
		ellipsis: true,
	},
	{
		dataIndex: "url",
		title: "访问地址",
		ellipsis: true,
	},
	{
		dataIndex: "statusCode",
		title: "状态码",
		ellipsis: true,
		render(_: any, record: any) {
			if (record.statusCode >= 200 && record.statusCode < 300) {
				return <Tag color="green">{record.statusCode}</Tag>;
			}

			if (record.statusCode > 300 && record.statusCode < 400) {
				return <Tag color="blue">{record.statusCode}</Tag>;
			}
			return <Tag color="red">{record.statusCode || "-"}</Tag>;
		},
	},
	{
		dataIndex: "createdAt",
		title: "创建时间",
		ellipsis: true,
		render(_: any, record: any) {
			return <div>{record.createdAt ? formatDate(record.createdAt) : "-"}</div>;
		},
	},
	{
		dataIndex: "updatedAt",
		title: "更新时间",
		ellipsis: true,
		render(_: any, record: any) {
			return <div>{record.updatedAt ? formatDate(record.updatedAt) : "-"}</div>;
		},
	},
];
