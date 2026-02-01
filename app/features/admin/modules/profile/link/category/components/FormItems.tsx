import { ProFormText, ProFormTextArea } from "@ant-design/pro-components";

export function FormItems() {
	return (
		<>
			<ProFormText
				name="name"
				label="标签名"
				placeholder="请输入"
				rules={[
					{
						required: true,
						message: "请输入用户名",
					},
				]}
			/>
			<ProFormTextArea
				name="description"
				label="描述"
				placeholder="请输入"
				rules={[
					{
						required: false,
						message: "请输入用户名",
					},
				]}
			/>
		</>
	);
}
