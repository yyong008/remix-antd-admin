import { Button, Form, message } from "antd";

import { DrawerForm } from "@ant-design/pro-components";
import { FormItems } from "./FormItems";
import {
	useCreateToolsMail,
	useSendToolsMail,
} from "~/api-client/queries/tools-mail";

export function MailForm({ content, refetch }: any) {
	const createMailTemplate = useCreateToolsMail();
	const sendMail = useSendToolsMail();
	const [form] = Form.useForm();
	// const { locale } = useParams();

	const onSaveTemplate = async () => {
		if (!content) {
			return message.error("input email content ~");
		}

		const vals = {
			name: form.getFieldValue("name"),
			subject: form.getFieldValue("subject"),
			to: form.getFieldValue("to"),
			replyTo: form.getFieldValue("replyTo"),
			content,
		};

		const result = await createMailTemplate.mutateAsync(vals);
		if (result?.code !== 0) {
			message.error(result?.message ?? "保存失败");
			return false;
		}
		message.success(result?.message ?? "保存成功");
		refetch?.();
		form.resetFields();
		return true;
	};
	return (
		<DrawerForm
			loading={createMailTemplate.isPending || sendMail.isPending}
			form={form}
			submitter={{
				render: (props, doms) => {
					return [
						<Button
							type="primary"
							key="rest"
							onClick={() => {
								onSaveTemplate();
							}}
						>
							保存模板
						</Button>,
						<Button
							type="primary"
							key="submit"
							onClick={() => props.form?.submit?.()}
						>
							发送邮件
						</Button>,
					];
				},
			}}
			onFinish={async (v) => {
				if (!content) {
					message.error("input email content ~");
					return false;
				}
				const payload = {
					to: v.to,
					subject: v.subject,
					replyTo: v.replyTo,
					content,
				};
				const result = await sendMail.mutateAsync(payload);
				if (result?.code !== 0) {
					message.error(result?.message ?? "发送失败");
					return false;
				}
				message.success(result?.message ?? "发送成功");
				return true;
			}}
			trigger={<Button type="primary">发布邮件</Button>}
		>
			<FormItems />
		</DrawerForm>
	);
}
