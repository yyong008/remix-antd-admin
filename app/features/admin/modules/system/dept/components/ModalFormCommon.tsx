import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItem";
import { useCreateDept } from "~/api-client/queries/system-dept";

type ModalFormCommonProps = {
	trigger?: any;
	treeOptions?: any;
};

export function ModalFormCommon(props: ModalFormCommonProps) {
	const { trigger, treeOptions } = props;
	const [form] = Form.useForm();
	const createSystemDept = useCreateDept();
	return (
		<ModalForm
			key={Date.now()}
			preserve={false}
			title="创建部门"
			onOpenChange={(c) => {
				if (!c) {
					return;
				}
			}}
			trigger={
				trigger ?? (
					<Button type="primary" icon={<EditOutlined />}>
						{"新建"}
					</Button>
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
				const result: any = await createSystemDept.mutateAsync(values);
				if (result?.code !== 0) {
					message.error(result?.message ?? "创建失败");
					return false;
				}

				message.success("创建成功");
				return true;
			}}
		>
			<ModalFormItems treeOptions={treeOptions} />
		</ModalForm>
	);
}
