import { Button, message } from "antd";
import { ModalForm, ProForm } from "@ant-design/pro-components";

import { EditOutlined } from "@ant-design/icons";
import { ModalFormItems } from "./ModalFormItems";

export function CreateBlogModal({ refetch }: any) {
	const [createBlogTag] = [(...args: any): any => {}]; // api.createBlogTag(args)
	const [form] = ProForm.useForm();
	return (
		<ModalForm
			title="创建标签"
			form={form}
			trigger={
				<Button type={"primary"} icon={<EditOutlined />}>
					新建
				</Button>
			}
			onOpenChange={() => {}}
			onFinish={async (values: any) => {
				const result = await createBlogTag(values);
				if (result.data.code !== 0) {
					message.error(result.data.message);
					return false;
				}
				message.success(result.data.message);
				form.resetFields();
				refetch();
				return true;
			}}
		>
			<ModalFormItems />
		</ModalForm>
	);
}
