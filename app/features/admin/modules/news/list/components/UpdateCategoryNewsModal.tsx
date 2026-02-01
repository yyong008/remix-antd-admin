import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { useParams } from "react-router";

export default function UpdateCategoryNewsModal({ trigger, record }: any) {
	const [form] = Form.useForm();
	const { id } = useParams();

	return (
		<ModalForm
			key={Date.now()}
			preserve={false}
			title={"修改Link分类"}
			onOpenChange={(c) => {
				if (!c || !record.id) {
					return;
				}
				form.setFieldsValue({
					...record,
				});
			}}
			trigger={
				trigger ?? <Button type={"link"} icon={<EditOutlined />}></Button>
			}
			form={form}
			autoFocusFirstInput
			modalProps={{
				destroyOnClose: true,
				onCancel: () => form.resetFields(),
			}}
			submitTimeout={2000}
			onFinish={async (values: any) => {
				const vals = {
					...values,
				};

				if (id) {
					vals.categoryId = Number(id);
				}

				form.resetFields();
				return true;
			}}
		></ModalForm>
	);
}
