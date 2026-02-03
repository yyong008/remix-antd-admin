import { ProFormDigit, ProFormText } from "@ant-design/pro-components";

export function FormItems() {
	return (
		<>
			<ProFormText label="用户名" name="name" />
			<ProFormText label="昵称" name="nickname" />
			<ProFormText label="邮箱" name="email" />
			<ProFormText label="备注" name="remark" />
			<ProFormText label="语言" name="locale" />
			<ProFormText label="主题" name="theme" />
			<ProFormDigit label="手机号" name="phone" />
			<ProFormText label="创建时间" name="createdAt" />
			<ProFormText label="部门" name="department" />
		</>
	);
}
