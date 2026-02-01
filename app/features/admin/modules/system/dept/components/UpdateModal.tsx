import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItem";
import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";

type UpdateDeptModalProps = {
	trigger?: any;
	record?: any;
	treeOptions?: any;
	refetch?: () => void;
};

export function UpdateDeptModal(props: UpdateDeptModalProps) {
	const { trigger, record, treeOptions, refetch } = props;
	const [form] = Form.useForm();
	const [updateDept] = [(...args: any): any => {}];
	const token = useAntdThemeToken();

	return (
		<ModalForm
			key={Date.now()}
			preserve={false}
			title="修改部门"
			onOpenChange={(c) => {
				if (!c || !record.id) {
					return;
				}
				form.setFieldsValue({
					...record,
				});
			}}
			trigger={
				trigger ?? (
					<Button
						type="link"
						icon={
							<EditOutlined
								style={{ color: token.colorPrimary }}
								twoToneColor={token.colorPrimary}
							/>
						}
					></Button>
				)
			}
			form={form}
			autoFocusFirstInput
			modalProps={{
				destroyOnClose: true,
				onCancel: () => form.resetFields(),
			}}
			submitTimeout={2000}
			onFinish={async (values: any) => {
				const vals = { ...values };
				if (record.id) {
					vals.id = record.id;
				}
				const result: any = await updateDept(vals).unwrap();
				if (result.code !== 0) {
					message.error(result.message ?? "删除失败");
					return false;
				}

				message.success("更新成功");
				refetch?.();
				form.resetFields();
				return true;
			}}
		>
			<ModalFormItems treeOptions={treeOptions} />
		</ModalForm>
	);
}
