import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./RoleFormItems";
import { ModalForm } from "@ant-design/pro-components";
import { useState } from "react";
import { useCreateRole } from "~/api-client/queries/system-role";

type CreateRoleModalProps = {
	trigger?: React.ReactNode;
	menu: any[];
	menuRoles: any[];
	refetch: any;
};

export function CreateRoleModal(props: CreateRoleModalProps) {
	const { trigger, menu, refetch } = props;
	const [form] = Form.useForm();
	const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
	const createRole = useCreateRole();
	const onCheck = (checkedKeys: any, info: any) => {
		setCheckedKeys(checkedKeys);
	};

	return (
		<ModalForm
			title="创建角色"
			trigger={
				trigger ??
				((
					<Button type={"primary"} icon={<EditOutlined />}>
						新建
					</Button>
				) as any)
			}
			form={form}
			autoFocusFirstInput
			onOpenChange={(e) => {
				if (e) {
					form.resetFields();
				}
			}}
			modalProps={{
				destroyOnClose: true,
				onCancel: () => {},
			}}
			submitTimeout={2000}
			onFinish={async (vals) => {
				await createRole.mutateAsync({ ...vals });
				refetch?.();
				return true;
			}}
		>
			<FormItems menu={menu} checkedKeys={checkedKeys} onCheck={onCheck} />
		</ModalForm>
	);
}
