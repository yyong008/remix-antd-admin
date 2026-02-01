import { Button, Form } from "antd";
import { useEffect, useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { MenuModalFormItems } from "./MenuModalFormItems";
import { ModalForm } from "@ant-design/pro-components";

type MenuModalProps = {
	trigger?: () => void;
	menuNotPerm?: any[];
	refetch: any;
};

export function CreateMenuModal(props: MenuModalProps) {
	const { trigger, menuNotPerm, refetch } = props;
	const [form] = Form.useForm();
	const [createMenu] = [(...args: any): any => {}];

	const [innerMenuNotPerm, setInnerMenuNotPerm] = useState<any>();

	useEffect(() => {
		const n = [
			{
				name: "根目录",
				key: "root",
				id: -1,
				children: menuNotPerm,
			},
		];

		setInnerMenuNotPerm([...n]);
	}, [menuNotPerm]);
	return (
		<ModalForm
			layout="horizontal"
			labelCol={{ span: 3 }}
			key={Date.now()}
			preserve={false}
			title={"创建菜单"}
			onOpenChange={(c) => {
				if (!c) {
					return;
				}
			}}
			trigger={
				trigger ??
				((
					<Button type={"primary"} icon={<EditOutlined />}>
						{"新建"}
					</Button>
				) as any)
			}
			form={form}
			autoFocusFirstInput
			modalProps={{
				destroyOnClose: true,
				onCancel: () => form.resetFields(),
			}}
			submitTimeout={2000}
			onFinish={async (values: any) => {
				await createMenu(values);
				form.resetFields();
				refetch?.();
				return true;
			}}
		>
			<MenuModalFormItems innerMenuNotPerm={innerMenuNotPerm} form={form} />
		</ModalForm>
	);
}
