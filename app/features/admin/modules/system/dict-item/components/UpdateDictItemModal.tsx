import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useUpdateDictItem } from "~/api-client/queries/system-dict-item";

export function UpdateDictItemModal({ trigger, record, refetch }: any) {
	const [form] = Form.useForm();
	const { colorPrimary } = useColorPrimary();
	const updateSystemDictItemById = useUpdateDictItem();
	return (
		<ModalForm
			key={Date.now()}
			preserve={false}
			title={"修改字典项"}
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
						type={"link"}
						icon={<EditOutlined style={{ color: colorPrimary }} />}
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
				await updateSystemDictItemById.mutateAsync({
					dictionaryId: record.dictionary_id,
					data: vals,
				});
				refetch?.();
				form.resetFields();
				return true;
			}}
		>
			<ModalFormItems />
		</ModalForm>
	);
}
