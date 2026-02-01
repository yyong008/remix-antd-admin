import { DeleteAction } from "./DeleteAction";
import { Space } from "antd";
import { StatusType } from "@/components/common";
import { UpdateRoleModal } from "./UpdateRoleModal";
import { UserOutlined } from "@ant-design/icons";
import { auth } from "@/utils/client/auth";

type CreateColumnsParams = {
	lang?: any;
	menus: any;
	menuRoles: any;
	refetch: any;
};

export const createColumns = (params: CreateColumnsParams) => {
	const { menus, menuRoles, refetch } = params;
	return [
		{
			title: "角色名",
			dataIndex: "name",
			render(_: any, record: any) {
				if (auth.isSuperAdmin(record)) {
					return (
						<Space>
							<UserOutlined style={{ color: "red", fontWeight: "bold" }} />
							<span style={{ color: "red", fontWeight: "bold" }}>
								{record.name}
							</span>
						</Space>
					);
				}

				if (auth.isAdmin(record)) {
					return (
						<Space>
							<UserOutlined style={{ color: "blue", fontWeight: "bold" }} />
							<span style={{ color: "blue", fontWeight: "bold" }}>
								{record.name}
							</span>
						</Space>
					);
				}
				return (
					<Space>
						<UserOutlined />
						<span>{record.name}</span>
					</Space>
				);
			},
		},
		{
			title: "角色值",
			dataIndex: "value",
		},
		{
			title: "角色描述",
			dataIndex: "description",
		},
		{
			dataIndex: "status",
			title: "状态",
			width: 100,
			ellipsis: true,
			render(_: any, record: any) {
				return <StatusType status={record.status} />;
			},
		},
		{
			title: "操作",
			render(_: any, record: any) {
				return (
					<Space>
						<UpdateRoleModal
							record={record}
							key="create-role-modal"
							menu={menus}
							menuRoles={menuRoles}
							refetch={refetch}
						/>
						<DeleteAction
							title="确定要删除次角色吗？"
							record={record}
							refetch={refetch}
						/>
					</Space>
				);
			},
		},
	];
};
