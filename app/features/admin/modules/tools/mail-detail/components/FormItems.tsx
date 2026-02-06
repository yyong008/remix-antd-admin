import { ProFormText } from "@ant-design/pro-components";

export function FormItems() {
	return (
		<>
			<ProFormText
				label="模板名称"
				name="name"
				placeholder="可选，便于管理"
			/>
			<ProFormText
				label="邮件标题"
				name="subject"
				placeholder="请输入邮件主题"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormText
				label="接收邮件人"
				name="to"
				placeholder="输入邮箱接收者，多个用逗号分隔"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormText
				label="回复邮箱"
				name="replyTo"
				placeholder="可选，默认使用配置中的 Reply-To"
			/>
		</>
	);
}
